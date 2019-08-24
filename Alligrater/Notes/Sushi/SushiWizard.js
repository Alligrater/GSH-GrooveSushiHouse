function summonSushi(summonJSON){
    switch(summonJSON.type){
        case "regular-sushi":
            summonRegularSushi(summonJSON);
            break;
        case "ghost-sushi":
            summonGhostSushi(summonJSON);
            break;
        case "junk-sushi":
            summonJunkSushi(summonJSON);
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

function summonGhostSushi(summonJSON){
    var sushi = new GhostSushi(summonJSON.start + MUSIC_OFFSET, summonJSON.side, summonJSON.from);
    SushiInputQueue.push(sushi);
}

function summonJunkSushi(summonJSON){
    var sushi = new JunkSushi(summonJSON.start + MUSIC_OFFSET, summonJSON.side, summonJSON.from)
    SushiInputQueue.push(sushi);
}