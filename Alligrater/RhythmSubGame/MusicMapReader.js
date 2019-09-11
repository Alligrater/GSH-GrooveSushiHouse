var BeatMap = [];
var BeatIndex = 0;




var music;
var BeatSpeed;
var FirstBeatCountdown;
var hit_sound;



function loadinRhythmMap(jsonpath){
    clearRhythmMapStatus();

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

    if(JSONContent.hitsound != null){
        hit_sound = sounds[JSONContent.hitsound];
    }
    else{
        hit_sound = sounds["Resources/SE/hit.wav"];
        hit_sound.volume = 0.0;
    }


}


function clearRhythmMapStatus(){
    BeatMap = [];
    BeatIndex = 0;
    fishstage.setVariables();
    sushistage.setVariables();

}
