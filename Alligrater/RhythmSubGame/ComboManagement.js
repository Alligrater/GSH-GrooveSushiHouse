var COMBO_COUNT = 0;

function doCombo(level, sushiside){
    COMBO_COUNT += 1;
    console.log(level);
    if(sushiside == null){
        if(level == ComboRating.PERFECT){
            fishstage.playPerfectFX()
        }
        else if(level == ComboRating.GOOD){
            fishstage.playGoodFX();
        }

        //Something needs to be done here to to get the sushi one.
    }
    else{
        //Do the sushi one.
        var side = -1;
        switch(sushiside[0]){
            case "l":
                side = 0;
                break;
            case "d":
                side = 1;
                break;
            case "r":
                side = 2;
                break;
        }

        if(level == ComboRating.PERFECT){
            sushistage.playPerfectFX(side);
            //console.log(sushiside);
        }
        else if(level == ComboRating.GOOD){
            sushistage.playGoodFX(side);
            //console.log(sushiside);
        }
    }


    if(!isSoundPlaying){
        hit_sound.play();
        isSoundPlaying = true;
    }
}


function doMiss(){
    COMBO_COUNT = 0;
}

function resetCombo(){
    COMBO_COUNT = 0;
}