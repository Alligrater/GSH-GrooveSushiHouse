class DialogueAction extends GenericStageAction{
    constructor(JSON){
        super();
        this.type = "dialogue-action";
        this.JSON = JSON;
    }

    execute(){
        //Set a new text on the dialogue box.
        //Something.
        storystage.dialogueBox.showDialogue(this.JSON.dialogue);
    }
}