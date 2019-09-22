class GhostSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Sushi/AnotherSushi.png";

        this.head = createSpriteOnStage(sushistage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
        this.type = "ghost-sushi"

    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.side){
            var comboRating = inputTimeCheck(currentTime, this.start);
            if(comboRating == ComboRating.PERFECT){
                this.enabled = false;
                this.isReady = true;
                doCombo(ComboRating.PERFECT, this.side);
                nextSushi(this);
            }
            else if(comboRating == ComboRating.GOOD){
                this.enabled = false;
                this.isReady = true;
                doCombo(ComboRating.GOOD, this.side);
                nextSushi(this);
            }
            else{
                //Not in range
            }
        }
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10){
            console.log("disable!");
            this.enabled = false;
            this.processMissEvent();
            console.log("miss")
            return;
        }
        this.head.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.head.y = this.y - this.vely * (currentTime - this.start + BeatSpeed);
        this.head.alpha = 1.5 - 1.0 * (currentTime - this.start + BeatSpeed) / BeatSpeed;
    }
}