
//Regular Fish Class
class RegularFish extends AbstractFish{
    constructor(time){
        super(time);
        this.type = "regular-fish";
        var headPath = "Resources/Images/RegularFish.png";
        //?
        this.head = createSpriteOnStage(fishstage,this.x, this.y, headPath);
        scaleSprite(this.head, 1.5);
    }

    processInput(key, eventType, currentTime){
        if(eventType == 1){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT){
                this.enabled = false;
                this.isReady = true;
                doCombo("perfect");
                nextFish();
            }
            else if(comboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doCombo("good");
                nextFish();
            }
            else{
                //Not in range
            }
        }
    }

    processMissEvent(){
        nextFish();
        doMiss();
    }

}