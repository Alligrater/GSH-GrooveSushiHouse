class JunkSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/Sushi/Melon.png";

        this.head = createSpriteOnStage(sushistage.stage, this.x, this.y, headPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
        this.type = "junk-sushi"

    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start){
            this.enabled = false;
            this.processMissEvent();
            return;
        }
        this.head.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.head.y = this.y - this.vely * (currentTime - this.start + BeatSpeed);
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
        doCombo(ComboRating.PERFECT, this.side);
    }
}