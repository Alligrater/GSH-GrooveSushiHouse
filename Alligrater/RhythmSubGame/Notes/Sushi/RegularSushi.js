class RegularSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Sushi/PlainSushi.png";

        if(CUR_SUSHI_INDEX % 2 == 0){
            headPath = "Resources/Images/Sushi/AnotherSushi.png";
        }

        this.head = createSpriteOnStage(sushistage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
        this.type = "regular-sushi"

    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.side){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT){
                this.enabled = false;
                this.isReady = true;
                doCombo(ComboRating.PERFECT);
                nextSushi(this);
            }
            else if(comboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doCombo(ComboRating.GOOD);
                nextSushi(this);
            }
            else{
                //Not in range
            }
        }
    }
}