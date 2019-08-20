
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
    console.log(ProcessIndex)
}

function nextSushi(){
    SushiInputIndex += 1;
}

const ComboRating = {
    PERFECT: 1,
    GOOD: 0,
    MISS: 2,
    NOT_IN_RANGE: 3
}

function inputTimeCheck(currentTime, inputTime){
    //1. What is a perfect hit:
    console.log("Check");
    if(inputTime - currentTime <= 10 && inputTime - currentTime >= -5){
        return ComboRating.PERFECT;
    }
    else if(inputTime - currentTime <= 25 || inputTime - currentTime >= -10){
        return ComboRating.GOOD;
    }
    else{
        return null;
    }
}