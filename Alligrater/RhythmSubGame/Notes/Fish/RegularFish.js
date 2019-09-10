
//Regular Fish Class
class RegularFish extends AbstractFish{
    constructor(time){
        super(time);
        this.type = "regular-fish";
        var headPath = "Resources/Images/Fish/RegularFish.png";
        //?
        this.head = createSpriteOnStage(fishstage.stage,this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
    }

    processInput(key, eventType, currentTime){
        if(eventType == 1){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT){
                this.enabled = false;
                this.isReady = true;
                doCombo("perfect");
                fishstage.nextFish();
            }
            else if(comboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doCombo("good");
                fishstage.nextFish();
            }
            else{
                //Not in range
            }
        }
    }

    processMissEvent(){
        fishstage.nextFish();
        doMiss();
    }

}