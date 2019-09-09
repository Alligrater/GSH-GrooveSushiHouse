
var STAGE_ACTION_LIST = [];

function loadAllStories(directory){
    var fs = require('fs');
    fs.readdir(directory, function(err, items) {
        //console.log(items);

        for (var i=0; i<items.length; i++) {
            //console.log(directory+items[i]);
            //loadCharacter(directory+items[i])
        }
    });
}


//This should load in all the stories
function loadStory(path){
    var fs = require('fs');
    var content = fs.readFileSync(jsonpath);

    //Parsing
    var JSONContent = JSON.parse(content);
    //This needs to be modified to fit the current style


    //?
}

