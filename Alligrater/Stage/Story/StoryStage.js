class StoryStage extends GenericStage{
    constructor(){
        super();
        this.setup();

    }


    setup(){
        this.dialogueBox = new DialogueBox(this.stage,CANVAS_WIDTH * 0.95, CANVAS_HEIGHT * 0.3, CANVAS_WIDTH/2, CANVAS_HEIGHT*0.85);
        this.background = null;
        this.backgroundVisible = false;
        this.CHARACTER_POOL = new Map();
    }

    update(delta){
        this.dialogueBox.update();
    }

    /*
    clearBackground(){
        if(this.background){
            this.background.visible = false;
        }
    }*/

    removeBackground(){
        if(this.background){
            this.stage.removeChild(this.background);
        }
        this.background = null;
    }

    setBackground(texturePath){
        this.background = createSpriteOnStage(this.stage, CANVAS_WIDTH/2, CANVAS_HEIGHT/2, texturePath);
        scaleSprite(this.background, 2);
    }

    hideAllCharacters(){
        for(var x of this.CHARACTER_POOL){
            x.visible = false;
        }
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

