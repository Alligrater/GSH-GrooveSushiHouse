var CHARACTER_POOL = new Map();

function loadAllCharacters(directory){
    var fs = require('fs');
    fs.readdir(directory, function(err, items) {
        //console.log(items);

        for (var i=0; i<items.length; i++) {
            //console.log(directory+items[i]);
            loadCharacter(directory+items[i])
        }
    });
}

function loadCharacter(path){
    //....
    var fs = require('fs');
    var content = fs.readFileSync(path);
    //Parsing
    var JSONContent = JSON.parse(content);
    //console.log(JSONContent);
    var character = new StageCharacter(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, JSONContent);
    //console.log(character);
    CHARACTER_POOL.set(character.name, character);
}