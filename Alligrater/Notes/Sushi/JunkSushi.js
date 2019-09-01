class JunkSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Sushi/Melon.png";

        this.head = createSpriteOnStage(sushistage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
        this.type = "junk-sushi"

    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.side){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT || comboRating == ComboRating.GOOD){
                this.enabled = false;
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