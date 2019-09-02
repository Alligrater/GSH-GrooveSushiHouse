class LongSushi extends AbstractSushi{
    constructor(time, stop, side, from){
        super(time, side, from);
        //Basically the same thing.

        var headPath = "Resources/Images/Sushi/SushiHead.png";
        var bodyPath = "Resources/Images/Sushi/SushiBody.png";
        var tailPath = "Resources/Images/Sushi/SushiTail.png";

        this.type = "long-sushi";
        this.stop = stop;

        this.keyDown = null;


        this.isHolding = false;
        this.isReady = false;

        var headSample = createSpriteOnStage(sushistage.stage,this.x, this.y, headPath);
        scaleSprite(headSample, 1.2);

        this.bodyLength = (this.stop - this.start) * this.vely + headSample.height;


        this.body = createTilingSpriteOnStage(sushistage.stage, this.x, this.y - headSample.height / 2, bodyPath, -1, this.bodyLength/1.2, 0.5, 0.0);
        scaleSprite(this.body, 1.2);

        //Tail
        this.tail = createSpriteOnStage(sushistage.stage,this.x,
            this.y - (this.stop - this.start) * this.vely, tailPath);
        scaleSprite(this.tail, 1.2);

        this.head = createSpriteOnStage(sushistage.stage,this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10 && !this.isReady){
            this.enabled = false;
            this.processMissEvent();
            return;
        }
        if(currentTime >= this.stop){
            this.enabled = false;
            return;
        }
        this.head.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.head.y = this.y - this.vely * (currentTime - this.start + BeatSpeed);


        this.body.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.body.y = this.y - this.head.height / 2 - this.vely * (currentTime - this.start + BeatSpeed);

        this.tail.x = this.x + (this.stop - this.start) * this.velx - this.velx * (currentTime - this.start + BeatSpeed);
        this.tail.y = this.y + (this.stop - this.start) * this.vely - this.vely * (currentTime - this.start + BeatSpeed);

        if(this.isHolding){
            console.log("holding");
            this.head.y = SUSHI_TARGET_Y;
            this.body.height = this.calculateBodyLength()/1.2;
            this.body.y = this.head.y - this.head.height/2
            if(inputTimeCheck(currentTime, this.stop) == ComboRating.PERFECT){
                doCombo("perfect");
                this.isHolding = false;
                this.isReady = false;
                nextSushi(this);
            }
        }
    }

    processInput(key, eventType, currentTime){
        //is it key press?
        if(eventType == 1){
            var comboRating = inputTimeCheck(currentTime, this.start);
            //Also check if it's head, if it's not head then it's nothing.
            console.log("Begin Long Note");
            if(comboRating == ComboRating.PERFECT){
                doCombo("perfect");
                this.isHolding = true;
                //this.head.visible = false;
                this.isReady = true;
                if(this.keyDown == null){
                    this.keyDown = key;
                }

            }
            else if(comboRating == ComboRating.GOOD){
                doCombo("good");
                this.isHolding = true;
                //this.head.visible = false;
                this.isReady = true;
                if(this.keyDown == null){
                    this.keyDown = key;
                }
            }
            else{

            }
        }
        //is it key release?
        else{
            if(this.isReady && key == this.keyDown){
                //First check whether it has started
                this.isHolding = false;
                console.log("End Long Note");
                if(inputTimeCheck(currentTime, this.stop) == ComboRating.PERFECT){
                    doCombo("perfect");
                    nextSushi(this);
                }
                else if(inputTimeCheck(currentTime, this.stop) == ComboRating.GOOD){
                    doCombo("good");
                    nextSushi(this);
                }
                else{
                    doMiss();
                    nextSushi(this);
                    //Do nothing
                }
            }


        }
    }

    processMissEvent(){
        //Do nothing.
        if(this.isHolding){

        }
        else{
            doMiss();
            nextSushi(this);
        }

    }

    calculateBodyLength(){
        return this.tail.y - this.head.y + this.head.height;
    }

    unregisterSelf() {
        this.stage.removeChild(this.head);
        this.stage.removeChild(this.body);
        this.stage.removeChild(this.tail);
    }


}