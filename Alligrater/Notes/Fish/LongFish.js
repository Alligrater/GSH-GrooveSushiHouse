class LongFish extends AbstractFish{
    constructor(time, stop){
        super(time);
        this.type = "long-fish";
        this.stop = stop;

        var headPath = "Resources/Images/FishHead.png";
        var bodyPath = "Resources/Images/FishBody.png";
        var tailPath = "Resources/Images/FishTail.png";


        this.isHolding = false;
        this.isReady = false;

        var headSample = createSpriteOnStage(fishstage,this.x, this.y, headPath);
        scaleSprite(headSample, 1.5);

        var bodyLength = (this.stop - this.start) * this.basespeed - headSample.width;


        //Make body part
        this.body = createTilingSpriteOnStage(fishstage, this.x + headSample.width / 2, this.y, bodyPath, bodyLength/1.5);
        scaleSprite(this.body, 1.5);

            //Tail
        this.tail = createSpriteOnStage(fishstage,this.x + (this.stop - this.start) * this.basespeed,
            this.y, tailPath);
        scaleSprite(this.tail, 1.5);

        this.head = createSpriteOnStage(fishstage,this.x, this.y, headPath);
        scaleSprite(this.head, 1.5);
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

        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);
        this.body.x = this.x + this.head.width / 2 - this.basespeed * (currentTime - this.start + BeatSpeed);

        this.tail.x = this.x + (this.stop - this.start) * this.basespeed - this.basespeed * (currentTime - this.start + BeatSpeed);



        //Deal with the holding event
        if(this.isHolding){
            console.log("holding");
            this.head.x = FISH_TARGET_X;
            this.body.width = this.calculateBodyLength()/1.5;
            this.body.x = this.head.x + this.head.width/2
            if(inputTimeCheck(currentTime, this.stop) == ComboRating.PERFECT){
                doCombo("perfect");
                this.isHolding = false;
                this.isReady = false;
                nextFish();
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
            }
            else if(comboRating == ComboRating.GOOD){
                doCombo("good");
                this.isHolding = true;
                //this.head.visible = false;
                this.isReady = true;
            }
            else{

            }
        }
        //is it key release?
        else{
            if(this.isReady){
                //First check whether it has started
                this.isHolding = false;
                console.log("End Long Note");
                if(inputTimeCheck(currentTime, this.stop) == ComboRating.PERFECT){
                    doCombo("perfect");
                    nextFish();
                }
                else if(inputTimeCheck(currentTime, this.stop) == ComboRating.GOOD){
                    doCombo("good");
                    nextFish();
                }
                else{
                    doMiss();
                    nextFish();
                    //Do nothing
                }
            }


        }
    }

    calculateBodyLength(){
        return this.tail.x - this.head.x - this.head.width;
    }

    processMissEvent(){
        //Do nothing.
        if(this.isHolding){

        }
        else{
            doMiss();
            nextFish();
        }

    }

    unregisterSelf(){
        this.stage.removeChild(this.head);
        this.stage.removeChild(this.body);
        this.stage.removeChild(this.tail);
    }
}
