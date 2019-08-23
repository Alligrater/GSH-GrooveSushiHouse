class RegularSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Melon.png";

        this.head = createSpriteOnStage(sushistage, this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
        this.type = "regular-sushi"

    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.side){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT || ComboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doMiss();
                nextSushi(this);
            }
            else{
                //Not in range
            }
        }
    }

    processMissEvent(){
        nextSushi(this);
        doCombo("perfect");
    }
}