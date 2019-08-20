//Fork wins
var isSoundPlaying = false;

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}

let up = keyboard("w"),
    down = keyboard("s"),
    left = keyboard("a"),
    right = keyboard("d");


up.press = () => {
    processInput("up", 1);
    console.log(TICK_TIME);
};

up.release = () => {
    processInput("up", 0);
};


down.press = () => {
    processInput("down", 1);
    console.log(TICK_TIME);
};

down.release = () => {
    processInput("down", 0);
};

left.press = () => {
    processInput("left", 1);
    console.log(TICK_TIME);
};

left.release = () => {
    processInput("left", 0);
};

right.press = () => {
    processInput("right", 1);
    console.log(TICK_TIME);
};

right.release = () => {
    processInput("right", 0);
};


function processInput(inputDir, type){
    if(ACTIVE_STAGE == fishstage){
        if(Fish_Tank[ProcessIndex]){
            Fish_Tank[ProcessIndex].processInput(inputDir, type, TICK_TIME);
        }
    }
    else{
        //Send input to all 4 keys
        for(var i = 0; i < 4; i++){
            //send to all 4
            var index = SushiInputIndex[i];
            if(SushiInputQueue[SushiInputIndex + index] != null){
                SushiInputQueue[SushiInputIndex + index].processInput(inputDir, type, TICK_TIME);
            }
        }
    }

    if(type == 1 && !isSoundPlaying){
        hit_sound.play();
        isSoundPlaying = true;
    }

}
