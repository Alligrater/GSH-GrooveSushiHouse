
class MenuStage extends GenericStage{
    constructor(){
        super();
    }

    setup(){

        this.menu_background = createSpriteOnStage(this.stage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/Menu_BG.png");
        scaleSprite(this.menu_background, 2);
        this.startButton = new Button(this.stage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/Menu_Button.png", "start");
        this.startButton.choose = function(){
            //go to the other stage
        }
    }

    update(delta){
        if(this.pause){
            return;
        }
    }

    processInput(key, type) {
        //super.processInput(key, type);
        if(key == "Enter"){
            ACTIVE_STAGE = fishstage;
            app.stage = fishstage.stage;
            fishstage.unpause();
            sushistage.unpause();
            pause = false;
        }
    }
}