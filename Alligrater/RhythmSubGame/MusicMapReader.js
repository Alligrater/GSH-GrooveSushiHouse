var BeatMap = [];
var BeatIndex = 0;
var ProcessIndex = 0;



var music;
var BeatSpeed;
var FirstBeatCountdown;
var hit_sound;



function loadinRhythmMap(jsonpath){
    var fs = require('fs');
    var content = fs.readFileSync(jsonpath);

    //Parsing
    var JSONContent = JSON.parse(content);
    //This needs to be modified to fit the current style

    for(var x of JSONContent.map){
        BeatMap.push(x);
    }

    BeatSpeed = JSONContent.timepernote;
    FirstBeatCountdown = JSONContent.map[0].start;



    music = sounds[JSONContent.path];
    music.volume = 0.5;
    hit_sound = sounds["Resources/SE/hit.wav"];
    sounds.whenLoaded = beginRenderSequence;
}

