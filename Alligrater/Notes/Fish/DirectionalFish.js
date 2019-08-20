
class DirectionalFish extends AbstractFish{
    constructor(time,direction){
        super(time);
        this.type = "directional-fish";
        this.direction = direction;

        var headPath = "Resources/Images/PufferFish.png";
        var arrowPath  = "Resources/Images/PufferFish_DIR.png";
        this.head = createSpriteOnStage(fishstage,this.x, this.y, headPath);
        scaleSprite(this.head, 1.5);
        this.arrow = createSpriteOnStage(fishstage,this.x, this.y, arrowPath);

        this.setDirection();
    }

    processInput(key, eventType, currentTime){
        if(eventType == 1 && key == this.direction){
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

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10 && !this.isReady){
            console.log("disable!");
            this.enabled = false;
            this.processMissEvent();
            return;
        }
        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);
        this.arrow.x = this.head.x;
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