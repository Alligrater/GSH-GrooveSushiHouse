class GenericStageAction{
    constructor(JSON){
        this.type = "generic-action"
        this.JSON = JSON;
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