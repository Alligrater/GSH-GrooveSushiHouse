class StoryStage extends GenericStage{
    constructor(){
        super();
        this.setup();

    }


    setup(){
        this.dialogueBox = new DialogueBox(this.stage,CANVAS_WIDTH * 0.95, CANVAS_HEIGHT * 0.3, CANVAS_WIDTH/2, CANVAS_HEIGHT*0.85);
    }

    update(delta){
        this.dialogueBox.update();
    }

    processInput(key, type) {
        //super.processInput(key, type);
        if(type == 0){
            switch (key){
                case "Enter":
                    ACTION_INDEX += 1;
                    if(STAGE_ACTION_LIST[ACTION_INDEX] != null){
                        //Do something
                        STAGE_ACTION_LIST[ACTION_INDEX].execute();
                    }
                    break;
                default:
                    break;
            }
        }


    }
}