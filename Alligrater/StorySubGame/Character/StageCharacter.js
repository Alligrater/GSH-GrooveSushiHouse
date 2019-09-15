const Behaviors = {
    IDLE: 0,   //Character is standing still
    MOVING: 1, //Character is moving towards target
    SITTING: 2, //Character is sitting
    INTERACT: 3 //Character interacts with surrounding objects.
}

class StageCharacter{

    constructor(x,y,JSON){
        this.spritesheet = null;
        this.animations = null;
        this.name = null;

        this.x = x;
        this.y = y;


        //Start by putting in a null animation.
        this.animations = new Map();
        this.animations.set("default", new CharacterAnimation("default", 0,0));

        if(JSON != null){
            //Override everything.
            this.x = x;
            this.y = y;
            //Read in the json object.
            this.name = JSON.name;
            this.spritesheet = JSON.spritesheet;

            var jsanimations = JSON.animations;
            for(var x of jsanimations){
                this.parseAnimation(x);
            }

            this.character = createAnimatedSpriteWithJSON(storystage.stage, this.x, this.y, this.spritesheet, "bundle");
            this.character.visible = false; //It's not the right time yet.
            scaleSprite(this.character, GLOBAL_SPRITE_SCALE);
            this.setAnimation(this.animations.get("default"));

            this.character.loop = true;
            this.character.animationSpeed = 0.05;
            this.playAnimation(0);


            this.character.onFrameChange = function(){

                //Check if the current frame is within range:
                //this.aniFrame += 1;
                if(this.currentFrame > this.animationStop || this.currentFrame < this.animationStart ){
                    //Loop back if the current frame is not something we want.
                    //this.visible = true;
                    this.gotoAndPlay(this.animationStart);
                }
                else{
                    //this.playAnimation(this.aniFrame);
                }
            }
        }
    }


    parseAnimation(JSONPiece){
        var name = JSONPiece.name;
        var start = JSONPiece.start;
        var stop = JSONPiece.stop;
        var ani = new CharacterAnimation(name,start,stop);
        this.animations.set(name, ani);


        //Use delta time interpolation on this one.
        this.velx = 0;
        this.vely = 0;

    }

    playAnimation(frameNumber){
            //this.character.visible = true;
            this.character.gotoAndPlay(frameNumber);
            this.character.zIndex = 5;
    }

    setAnimation(animation){
        this.currentAnimation = animation;
        this.character.animationStart = animation.start;
        this.character.animationStop = animation.stop;
    }

    setAnimationWithName(name){
        var animation = this.animations.get(name);
        if(animation != null){
            this.setAnimation(animation);
        }
    }


    setPos(posx, posy){
        this.x = posx;
        this.y = posy;
        this.character.x = this.x;
        this.character.y = this.y;
    }

    update(delta){
        //Update this character to make it move.
    }
}