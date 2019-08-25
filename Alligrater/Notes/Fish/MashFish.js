class MashFish extends AbstractFish{
    constructor(time, stop){
        super(time);
        this.type = "mash-fish";
        this.stop = stop;
        var headPath = "Resources/Images/Fish/MashFish.png";
        this.head = createSpriteOnStage(fishstage, this.x, this.y, headPath);
        scaleSprite(this.head, 1.5);
        this.isReady = false;
    }

    update(currentTime){
        //Do something?
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
            console.log("End Mash!");
            nextFish();
            return;
        }
        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);
        if(this.isReady){
            this.head.x = FISH_TARGET_X;
        }

    }


    processInput(key, eventType, currentTime){
        if(eventType == 1){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.GOOD || comboRating == ComboRating.PERFECT){
                if(!this.isReady){
                    console.log("Begin Mash!");
                    doCombo("perfect");
                    this.basespeed = 0;
                    this.head.x = FISH_TARGET_X;
                    this.isReady = true;
                }
                else{
                    console.log("Hit!");
                }

            }
            else{
                //Not in range

            }
        }
    }
}