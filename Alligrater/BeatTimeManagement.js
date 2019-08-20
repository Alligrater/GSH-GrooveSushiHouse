
//This is the queue of musics.
//We will put in all notes that will happen in the range
/*
 *          20TICK----[Note]--10TICK
 *                        20TICK----[Note]--10TICK
 */

function nextFish(){
    if(Fish_Tank[ProcessIndex] != null){
        Fish_Tank[ProcessIndex].enabled = false;
        Fish_Tank[ProcessIndex].unregisterSelf();
    }
    ProcessIndex += 1;
}

function nextSushi(currentSushi){
    currentSushi.enabled = false;
    currentSushi.unregisterSelf();
    for(var i = 0; i < 4; i++){
        if(SushiInputIndices[i] == currentSushi.sushi_index){
            SushiInputIndices[i] = findMax(SushiInputIndices.values()) + 1;
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