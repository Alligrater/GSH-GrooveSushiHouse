class StoryStage extends GenericStage{
    constructor(){
        super();
        this.setup();

    }


    setup(){
        this.dialogueBox = new DialogueBox(this.stage,CANVAS_WIDTH * 0.95, CANVAS_HEIGHT * 0.2, CANVAS_WIDTH/2, CANVAS_HEIGHT*0.75);
    }

    update(delta){
        this.dialogueBox.update();
    }
}