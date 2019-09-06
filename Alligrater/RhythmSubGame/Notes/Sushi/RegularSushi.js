class RegularSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Sushi/PlainSushi.png";

        this.head = createSpriteOnStage(sushistage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
        this.type = "regular-sushi"

    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.side){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT){
                this.enabled = false;
                this.isReady = true;
                doCombo("perfect");
                nextSushi(this);
            }
            else if(comboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doCombo("good");
                nextSushi(this);
            }
            else{
                //Not in range
            }
        }
    }
}