

SushiOrderQueue = [];
SushiOrderIndex = 0;


SushiInputQueue = [];
SushiInputIndices = [0, 1, 2, 3];


var sushistage;
var sushi_background;

var hasUpdatedQueue = false;

function sushiUpdate(delta){
    sushimessage.text = SushiInputIndices;

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
            sushiAutoPlay();
        }

        //Update All Sushi
        for(var x of SushiInputQueue){
            x.update(TICK_TIME);
        }

    }
}

function sushiAutoPlay(){
    
}