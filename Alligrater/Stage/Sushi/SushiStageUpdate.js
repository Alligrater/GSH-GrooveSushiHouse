

SushiOrderQueue = [];
SushiOrderIndex = 0;


SushiInputQueue = [];
SushiInputIndices = [0, 1, 2, 3];


var sushistage;
var sushi_background;

var hasUpdatedQueue = false;

function sushiUpdate(delta){
    sushimessage.text = (TICK_TIME) + " INDEX: " + SushiInputIndices + " COMBO: " + COMBO_COUNT;

    if(ACTIVE_STAGE == sushistage){
        //Begin parsing:
        if(!hasUpdatedQueue){
            while(BeatMap[BeatIndex] != null && BeatMap[BeatIndex].type != "switch"){
                //Do work
                SushiOrderQueue.push(BeatMap[BeatIndex]);

                //Then increment
                BeatIndex += 1;
            }
            hasUpdatedQueue = true;
        }

        if(SushiOrderQueue[SushiOrderIndex] != null && TICK_TIME >= SushiOrderQueue[SushiOrderIndex].start + MUSIC_OFFSET - BeatSpeed){
            //Summon Sushi
            for(var i = 0; i < 4; i++){
                if(SushiOrderQueue[SushiOrderIndex + i] != null) {
                    summonSushi(SushiOrderQueue[SushiOrderIndex + i]);
                }
            }

            SushiOrderIndex += 4;
        }


        if(AUTO_PLAY){
            for(var index of SushiInputIndices){
                if(SushiInputQueue[index] != null && TICK_TIME >= SushiInputQueue[index].start){
                    //Process Input
                    sushiAutoPlay(SushiInputQueue[index]);
                }
            }
        }

        //Update All Sushi
        for(var x of SushiInputQueue){
            x.update(TICK_TIME);
        }

    }
}

function sushiAutoPlay(sushi){
    switch(sushi.type){
        case "junk-sushi":
            //Do nothing
            break;
        default:
            processInput(sushi.side, 1);
    }
}