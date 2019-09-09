
var STAGE_ACTION_LIST = [];
var ACTION_INDEX = 0;


//This should load in all the stories
function loadAllStories(directory){
    var fs = require('fs');
    fs.readdir(directory, function(err, items) {
        //console.log(items);

        for (var i=0; i<items.length; i++) {
            //console.log(directory+items[i]);
            loadStory(directory+items[i]);
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


    if(STAGE_ACTION_LIST[0] != null){
        //console.log("complete");
        STAGE_ACTION_LIST[0].execute();
    }
}

function loadActions(JSON){
    if(JSON.type){
        switch(JSON.type){

            case "dialogue-action":
                //Do something
                STAGE_ACTION_LIST.push(new DialogueAction(JSON));
                break;
            case "stage-action":
                STAGE_ACTION_LIST.push(new StageSetupAction(JSON));
            default:
                //do nothing
                break;
        }
    }



    //?
}

