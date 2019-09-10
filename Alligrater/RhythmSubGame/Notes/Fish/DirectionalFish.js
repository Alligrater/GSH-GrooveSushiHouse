
class DirectionalFish extends AbstractFish{
    constructor(time,direction){
        super(time);
        this.type = "directional-fish";
        this.direction = direction;

        var headPath = "Resources/Images/Fish/DirectionalFish.png";
        var arrowPath = "Resources/Images/Fish/Arrow.png";
        this.head = createSpriteOnStage(fishstage.stage,this.x, this.y, headPath);
        this.arrow = createSpriteOnStage(fishstage.stage,this.x - 9, this.y, arrowPath);
        scaleSprite(this.head, GLOBAL_SPRITE_SCALE);
        scaleSprite(this.arrow, GLOBAL_SPRITE_SCALE);

        this.setDirection();
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10 && !this.isReady){
            this.enabled = false;
            this.processMissEvent();
            return;
        }
        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);
        this.arrow.x = this.x - 9 - this.basespeed * (currentTime - this.start + BeatSpeed);
    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.direction){
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

    setDirection(){
        switch(this.direction){
            case "up":
                this.arrow.rotation = 0.5*Math.PI;
                break;
            case "down":
                this.arrow.rotation = 1.5*Math.PI;
                break;
            case "right":
                this.arrow.rotation = Math.PI;
                break;
            case "left":
                break;
            default:
                break;
        }
    }

    unregisterSelf(){
        //Do nothing
        app.stage.removeChild(this.head);
        app.stage.removeChild(this.arrow);
    }
}