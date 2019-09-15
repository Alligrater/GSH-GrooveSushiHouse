class GenericStageAction{
    constructor(JSON){
        this.type = "generic-action"
        this.JSON = JSON;
        this.hasWaitExecuted = false;
        this.autoplay = false;
    }

    execute(){
        //Do something with the stage.
    }

    executeParams(param){
        this.autoplay = false;
        switch (param){
            case "hide-dialogue":
                storystage.dialogueBox.hideBox();
                break;
            case "show-dialogue":
                storystage.dialogueBox.showBox();
                break;
            case "auto-play":
                this.autoplay = true;
                break;
            default:
                break;
        }
    }

    executeWait(){
        if(this.JSON.wait){
            if(!this.hasWaitExecuted){
                //Prevents multiple input that can break the game.
                this.hasWaitExecuted = true;
                storystage.setDisableInput(this.JSON.wait*80); //Uses a different clock.
                setTimeout(nextStageAction,this.JSON.wait*1000);
            }

        }
    }

    executeAudio(){
        if(this.JSON.audio){
            sounds[this.JSON.audio].play();
        }
    }

    executeScreenShake(){
        if(this.JSON.screenshake){
            storystage.scheduleScreenshake(this.JSON.screenshake.time, this.JSON.screenshake.amount)
        }
    }

}