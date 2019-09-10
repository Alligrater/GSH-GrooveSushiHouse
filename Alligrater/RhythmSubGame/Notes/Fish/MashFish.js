class MashFish extends AbstractFish{
    constructor(time, stop){
        super(time);
        this.type = "mash-fish";
        this.stop = stop;
        var headPath = "Resources/Images/Fish/MashFish.png";
        this.head = createSpriteOnStage(fishstage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
        this.isReady = false;
        this.scale = GLOBAL_SPRITE_SCALE;
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
            fishstage.nextFish();
            return;
        }

        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);

        if(this.isReady){
            this.head.x = FISH_TARGET_X;
            if(this.scale > GLOBAL_SPRITE_SCALE){
                this.scale -= 0.02;
            }
            this.head.scale.x = this.scale;
            this.head.scale.y = this.scale;
        }

    }

    poof(){
        this.scale *= 1.2;
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
                    if(!isSoundPlaying){
                        console.log("Hit!");
                        hit_sound.play();
                        isSoundPlaying = true;
                        this.poof();
                    }
                }

            }
            else{
                if(this.isReady && this.enabled == true){
                    if(!isSoundPlaying){
                        console.log("Hit!");
                        hit_sound.play();
                        isSoundPlaying = true;
                        this.poof();
                    }
                }
                //Not in range

            }
        }
    }
}