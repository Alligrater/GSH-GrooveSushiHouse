


var fishstage;
//key detect range
var fishing_background;
var detection_good;
var detection_perfect;

function fishingUpdate(delta){

    if(TICK_TIME == MUSIC_OFFSET){
        music.play();
    }


    if(BeatMap[BeatIndex] != null){
        if(BeatMap[BeatIndex].type != "switch" && TICK_TIME >= BeatMap[BeatIndex].start + MUSIC_OFFSET - BeatSpeed){
            summonFish(BeatMap[BeatIndex]);
            BeatIndex += 1;
        }
        else if(BeatMap[BeatIndex].type == "switch" && TICK_TIME >= BeatMap[BeatIndex].start + MUSIC_OFFSET){
            //Switch to a new stage:
            if(app.stage == fishstage){
                app.stage = sushistage;
            }
            else{
                app.stage = fishstage;
            }
            ACTIVE_STAGE = app.stage;
            hasUpdatedQueue = false;
            console.log("switch!");
            BeatIndex += 1;
        }
    }

    if(AUTO_PLAY && Fish_Tank[ProcessIndex] != null && TICK_TIME >= Fish_Tank[ProcessIndex].start){
        executeAutoPlay();
    }


    for(var n of Fish_Tank){
        n.update(TICK_TIME);
    }

    isSoundPlaying = false;
}

function executeAutoPlay(){

    switch(Fish_Tank[ProcessIndex].type){
        case "directional-fish":
            processInput(Fish_Tank[ProcessIndex].direction, 1);
            break;
        case "long-fish":
            if(TICK_TIME == Fish_Tank[ProcessIndex].start){
                processInput("up", 1);
            }
            break;
        case "mash-fish":
            if(TICK_TIME == Fish_Tank[ProcessIndex].start){
                processInput("up", 1);
            }
            else if((TICK_TIME - Fish_Tank[ProcessIndex].start) % 5 == 0){
                processInput("up", 1);
            }
            else{
                //Do nothing
            }
            break;
        default:
            processInput("up", 1);
    }
}