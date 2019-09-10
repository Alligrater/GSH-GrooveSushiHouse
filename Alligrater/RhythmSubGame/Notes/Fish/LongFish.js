class LongFish extends AbstractFish{
    constructor(time, stop){
        super(time);
        this.type = "long-fish";
        this.stop = stop;

        var headPath = "Resources/Images/Fish/FishHead.png";
        var bodyPath = "Resources/Images/Fish/FishBody.png";
        var tailPath = "Resources/Images/Fish/FishTail.png";


        this.isHolding = false;
        this.isReady = false;

        this.keyDown = null;

        var headSample = createSpriteOnStage(fishstage.stage,this.x, this.y, headPath);
        scaleSprite(headSample, GLOBAL_SPRITE_SCALE);

        var bodyLength = (this.stop - this.start) * this.basespeed - headSample.width;


        //Make body part
        this.body = createTilingSpriteOnStage(fishstage.stage, this.x + headSample.width / 2, this.y, bodyPath, bodyLength/GLOBAL_SPRITE_SCALE);
        scaleSprite(this.body, GLOBAL_SPRITE_SCALE);

            //Tail
        this.tail = createSpriteOnStage(fishstage.stage,this.x + (this.stop - this.start) * this.basespeed,
            this.y, tailPath);
        scaleSprite(this.tail, GLOBAL_SPRITE_SCALE);

        this.head = createSpriteOnStage(fishstage.stage,this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
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
            this.body.width = this.calculateBodyLength()/GLOBAL_SPRITE_SCALE;
            this.body.x = this.head.x + this.head.width/2
            if(inputTimeCheck(currentTime, this.stop) == ComboRating.PERFECT){
                doCombo("perfect");
                this.isHolding = false;
                this.isReady = false;
                fishstage.nextFish();
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
                    fishstage.nextFish();
                }
                else if(inputTimeCheck(currentTime, this.stop) == ComboRating.GOOD){
                    doCombo("good");
                    fishstage.nextFish();
                }
                else{
                    doMiss();
                    fishstage.nextFish();
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
            fishstage.nextFish();
        }

    }

    unregisterSelf(){
        this.stage.removeChild(this.head);
        this.stage.removeChild(this.body);
        this.stage.removeChild(this.tail);
    }
}
