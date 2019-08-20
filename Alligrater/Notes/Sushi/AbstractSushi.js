

var CUR_SUSHI_INDEX = 0;

class AbstractSushi extends GenericNote{
    constructor(time, side, from){
        super(time);
        this.x = MAP_CENTER_X;
        this.y = MAP_CENTER_Y;
        this.type = "abstract-sushi";

        this.velx = 0;
        this.vely = 0;
        this.enabled = true;
        this.side = side;
        this.from = from;
        this.head = null;

        this.sushi_index = CUR_SUSHI_INDEX;
        CUR_SUSHI_INDEX += 1;

        this.setSpawnPointAndVelocity();
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10){
            console.log("disable!");
            this.enabled = false;
            //this.processMissEvent();
            return;
        }
        this.head.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.head.y = this.y - this.vely * (currentTime - this.start + BeatSpeed);

    }

    setSpawnPointAndVelocity(){
        var directionVec = 0;
        switch(this.from){
            case("up"):
                directionVec = -1;
                break;
            case("down"):
                directionVec = +1;
                break;
        }
        switch(this.side){
            case("left"):
                this.x = SPAWN_X_LEFT;
                this.y = sushi_background.y + directionVec * SPAWNDISTANCE_Y;
                break;
            case("right"):
                this.x = SPAWN_X_RIGHT;
                this.y = MAP_CENTER_Y + directionVec * SPAWNDISTANCE_Y;
                break;
            default:
                break;
        }
        this.velx = 0;

        this.vely = (this.y - MAP_CENTER_Y)/BeatSpeed;
    }

    processMissEvent(){
        nextSushi();
        doMiss();
    }

    processInput(key, eventType, currentTime){
        //Ignore
        //console.log(key, eventType, currentTime);
    }


}