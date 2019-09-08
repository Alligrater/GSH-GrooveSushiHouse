const Behaviors = {
    IDLE: 0,   //Character is standing still
    MOVING: 1, //Character is moving towards target
    SITTING: 2, //Character is sitting
    INTERACT: 3 //Character interacts with surrounding objects.
}

class StageCharacter{

    constructor(x,y,JSON){
        this.characterPath = null;
        this.animations = null;

        this.x = -1;
        this.y = -1;

        this.state = Behaviors.IDLE;
        //Start by putting in a null animation.
        this.animations = new Map(["null", null]);

        if(JSON != null){
            //Override everything.
            this.x = x;
            this.y = y;
            //Read in the json object.
            this.character = createAnimatedSpriteWithJSON(storystage, this.x, this.y, JSON, "bundle");
        }
    }
}