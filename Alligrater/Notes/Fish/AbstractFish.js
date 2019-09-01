


//Regular Fish Class
class AbstractFish extends GenericNote{
    constructor(time){
        super(time);
        this.type = "abstract-fish";
        this.x = DEFAULT_FISH_SPAWN_X;
        this.y = DEFAULT_SPAWN_POINT_Y;
        this.basespeed = (DEFAULT_FISH_SPAWN_X - FISH_TARGET_X)/BeatSpeed;

        this.head = null;


    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10 && !this.isReady){
            this.processMissEvent();
            this.enabled = false;
            return;
        }
        this.head.x = this.x - this.basespeed * (currentTime - this.start + BeatSpeed);
    }

    processInput(key, eventType, currentTime){
        //Ignore
    }

    processMissEvent(){
        fishstage.nextFish();
        doMiss();
    }


}

function rng(lowRange, highRange){
    return Math.floor(Math.random()*highRange+lowRange)
}
