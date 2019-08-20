var COMBO_COUNT = 0;

function doCombo(level){
    COMBO_COUNT += 1;
    console.log(level);
}


function doMiss(){
    COMBO_COUNT = 0;
}