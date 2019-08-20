
function summonFish(summonJSON){
    var type = summonJSON.type;
    switch (type){
        case "regular-fish":
            summonRegularFish(summonJSON);
            break;
        case "long-fish":
            summonLongFish(summonJSON);
            console.log("summoned Long fish");
            break;
        case "directional-fish":
            summonDirectionalFish(summonJSON);
            break;
        case "mash-fish":
            summonMashFish(summonJSON);
            break;
        default:
            break;
    }
}

function summonRegularFish(summonJSON){
    var fish = new RegularFish(summonJSON.start + MUSIC_OFFSET);
    Fish_Tank.push(fish);
}

function summonLongFish(summonJSON){
    var fish = new LongFish(summonJSON.start + MUSIC_OFFSET, summonJSON.until + MUSIC_OFFSET);
    Fish_Tank.push(fish);
}

function summonDirectionalFish(summonJSON){
    var fish = new DirectionalFish(summonJSON.start + MUSIC_OFFSET, summonJSON.direction);
    Fish_Tank.push(fish);
}

function summonMashFish(summonJSON){
    var fish = new MashFish(summonJSON.start + MUSIC_OFFSET, summonJSON.until + MUSIC_OFFSET);
    Fish_Tank.push(fish);
}