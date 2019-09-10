class StageSetupAction extends GenericStageAction{
    constructor(JSON){
        super();
        //Do something
        this.type = "stage-action";
        this.JSON = JSON;
    }

    execute() {
        if(this.JSON.background){
            storystage.setBackground(this.JSON.background);
        }
        if(this.JSON.actor && this.JSON.actor.length > 0){
            //Do something with the actors.
            storystage.hideAllCharacters();
            for(var x of this.JSON.actor){
                if(storystage.CHARACTER_POOL.get(x.name)){
                    var character = storystage.CHARACTER_POOL.get(x.name).character;
                    character.visible = true;
                    if(x.posx){
                        console.log(x.posx);
                        character.x = CANVAS_WIDTH * x.posx;
                    }
                    if(x.posy){
                        character.y = CANVAS_HEIGHT * x.posy;
                    }
                    character.zIndex = 5;
                }
            }
        }
        //Set up something on the stage.
        //Now move on.
        nextStageAction();
    }
}