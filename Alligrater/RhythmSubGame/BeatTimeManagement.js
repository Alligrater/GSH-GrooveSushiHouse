
//This is the queue of musics.
//We will put in all notes that will happen in the range
/*
 *          20TICK----[Note]--10TICK
 *                        20TICK----[Note]--10TICK
 */


function nextSushi(currentSushi){
    console.log("new sushi");
    currentSushi.enabled = false;
    currentSushi.unregisterSelf();
    var maxVal = findMax(sushistage.SushiInputIndices.values()) + 1;
    for(var i = 0; i < 4; i++){
        if(sushistage.SushiInputIndices[i] == currentSushi.sushi_index){
            sushistage.SushiInputIndices.splice(i, 1);
            sushistage.SushiInputIndices.push(maxVal);
        }
    }
}

const ComboRating = {
    PERFECT: 1,
    GOOD: 0,
    MISS: 2,
    NOT_IN_RANGE: 3
}

function inputTimeCheck(currentTime, inputTime){
    //1. What is a perfect hit:

    if(inputTime - currentTime <= 4 && inputTime - currentTime >= -4){
        return ComboRating.PERFECT;
    }
    else if(inputTime - currentTime <= 10 && inputTime - currentTime >= -10){
        return ComboRating.GOOD;
    }
    else{
        return ComboRating.NOT_IN_RANGE;
    }
}

function findMax(inputArray){
    var max = -1;
    for(var x of inputArray){
        if(x > max){
            max = x;
        }
    }
    return max;

}