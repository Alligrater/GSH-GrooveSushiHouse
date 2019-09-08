const Behaviors = {
    IDLE: 0,   //Character is standing still
    MOVING: 1, //Character is moving towards target
    SITTING: 2, //Character is sitting
    INTERACT: 3 //Character interacts with surrounding objects.
}

class StageCharacter{

    constructor(JSON){
        this.characterPath = null;
        this.animations = null;

        this.x = -1;
        this.y = -1;

        this.state = Behaviors.IDLE;
        //Start by putting in a null animation.
        this.animations = new Map(["null", null]);

        if(JSON != null){
            //Override everything.
        }
    }
}