class StageSetupAction extends GenericStageAction{
    constructor(JSON){
        super(JSON);
        //Do something
        this.type = "stage-action";

    }

    execute() {
        if(this.JSON.background){
            //Do something with the background:
            if(this.JSON.background.name){
                storystage.setBackground(this.JSON.background.name);
            }

            //storystage.background.
        }

        //Put new actors on to the stage, or move them if they are already there.
        if(this.JSON.actor && this.JSON.actor.length > 0){
            //Do something with the actors.
            //storystage.hideAllCharacters();
            for(var x of this.JSON.actor){
                if(storystage.CHARACTER_POOL.get(x.name)){
                    var character = storystage.CHARACTER_POOL.get(x.name).character;
                    //character.visible = true;
                    if(x.posx){
                        console.log(x.posx);
                        character.x = CANVAS_WIDTH * x.posx;
                    }
                    if(x.posy){
                        character.y = CANVAS_HEIGHT * x.posy;
                    }

                    if(x.visible != null){
                        character.visible = x.visible;
                    }
                    character.zIndex = 5;
                }
            }
        }

        if(this.JSON.hideactor && this.JSON.hideactor.length > 0){
            //Time to hide the actor.
            for(var x of this.JSON.hideactor){
                if(storystage.CHARACTER_POOL.get(x)){
                    var character = storystage.CHARACTER_POOL.get(x).character;
                    character.visible = false;
                }
            }
        }



        this.executeScreenShake();

        this.executeAudio();

        this.executeWait();

        if(this.JSON.params){
            //Execute them.
            for(var x of this.JSON.params){
                this.executeParams(x);
            }
        }

    }

    executeWait(){
        console.log("executewait")
        if(this.JSON.wait){
            if(!this.hasWaitExecuted){
                //Prevents multiple input that can break the game.
                this.hasWaitExecuted = true;
                storystage.setDisableInput(this.JSON.wait*80); //Uses a different clock.
                setTimeout(nextStageAction,this.JSON.wait*1000);
            }

        }
        //Set up something on the stage.
        //Now move on.
        else{
            nextStageAction();
        }
    }


}