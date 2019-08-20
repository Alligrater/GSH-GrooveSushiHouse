function summonSushi(summonJSON){
    switch(summonJSON.type){
        case("regular-sushi"):
            summonRegularSushi(summonJSON);
            break;
        default:
            break;
    }
}

function summonRegularSushi(summonJSON){
    var sushi = new RegularSushi(summonJSON.start + MUSIC_OFFSET, summonJSON.side, summonJSON.from);
    //Put it in the list
    SushiInputQueue.push(sushi);
}