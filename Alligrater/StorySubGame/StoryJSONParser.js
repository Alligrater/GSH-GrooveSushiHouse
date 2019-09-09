
var STAGE_ACTION_LIST = [];


//This should load in all the stories
function loadAllStories(directory){
    var fs = require('fs');
    fs.readdir(directory, function(err, items) {
        //console.log(items);

        for (var i=0; i<items.length; i++) {
            console.log(directory+items[i]);
            loadStory(JSON);
        }
    });
}


function loadStory(path){
    var fs = require('fs');
    var content = fs.readFileSync(path);
    //Parsing
    var JSONContent = JSON.parse(content);

    for(x of JSONContent.storyscript){
        loadActions(x);
    }
}

function loadActions(JSON){
    switch(JSON.type){
        case "dialogue-action":
            //Do something
            STAGE_ACTION_LIST.push(new DialogueAction(JSON));
            break;
        default:
            //do nothing
            break;
    }


    //?
}

