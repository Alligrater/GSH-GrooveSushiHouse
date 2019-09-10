
var STAGE_ACTION_LIST = [];
var ACTION_INDEX = 0;

var ALL_STORY_STAGES = new Map();
var ACTIVE_ACTION_LIST;


//This should load in all the stories
function loadAllStories(directory){
    var fs = require('fs');
    fs.readdir(directory, function(err, items) {
        //console.log(items);

        for (var i=0; i<items.length; i++) {
            //console.log(directory+items[i]);
            STAGE_ACTION_LIST = [];
            var name = loadStory(directory+items[i]);
            ALL_STORY_STAGES.set(name, STAGE_ACTION_LIST);
            if(name == "Main"){
                //This should become the active one.
                ACTIVE_ACTION_LIST = STAGE_ACTION_LIST;
                if(ACTIVE_ACTION_LIST[0] != null){
                    console.log("complete");
                    ACTIVE_ACTION_LIST[0].execute();
                }
            }
        }
        //Clean up when everything is done.
        STAGE_ACTION_LIST = null;

        //Then execute.

    });
}


function loadStory(path){
    var fs = require('fs');
    var content = fs.readFileSync(path);
    //Parsing
    var JSONContent = JSON.parse(content);

    for(x of JSONContent.storyscript){
        loadActions(x);
        //Set the first one as the active one. first come, first served.
    }

    return JSONContent.name;
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
            case "story-action":
                STAGE_ACTION_LIST.push(new StoryAction(JSON));
            default:
                //do nothing
                break;
        }
    }
}


function nextStageAction(){
    ACTION_INDEX += 1;
    if(ACTIVE_ACTION_LIST[ACTION_INDEX] != null){
        //Do something
        ACTIVE_ACTION_LIST[ACTION_INDEX].execute();
    }
}


function playStory(storyName){
    if(ALL_STORY_STAGES.get(storyName)){
        ACTIVE_ACTION_LIST = ALL_STORY_STAGES.get(storyName);
        ACTION_INDEX = 0;
        ACTIVE_ACTION_LIST[ACTION_INDEX].execute();
    }
}