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

        this.x = -1;
        this.y = -1;

        this.state = Behaviors.IDLE;
        //Start by putting in a null animation.
        this.animations = new Map();

        if(JSON != null){
            //Override everything.
            this.x = x;
            this.y = y;
            //Read in the json object.
            this.name = JSON.name;
            this.spritesheet = JSON.spritesheet;
            var animations = JSON.animations;
            for(var x of animations){
                this.parseAnimation(x);
            }
            console.log(this.spritesheet);
            this.character = createAnimatedSpriteWithJSON(storystage.stage, this.x, this.y, this.spritesheet, "bundle");
        }
    }


    parseAnimation(JSONPiece){
        var name = JSONPiece.name;
        var start = JSONPiece.start;
        var stop = JSONPiece.stop;
        var ani = new CharacterAnimation(name,start,stop);
        this.animations.set(name, ani);

    }
}