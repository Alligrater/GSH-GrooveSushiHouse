class GenericStageAction{
    constructor(){
        this.type = "generic-action"
    }

    execute(){
        //Do something with the stage.
    }

    executeParams(param){
        switch (param){
            case "hide-dialogue":
                storystage.dialogueBox.hideBox();
                break;
            case "show-dialogue":
                storystage.dialogueBox.showBox();
                break;
            default:
                break;
        }
    }

}