
class MenuStage extends GenericStage{
    constructor(){
        super();
        this.setVariables();
        this.setup();
    }

    setVariables() {
        this.buttons = [];
        this.buttonIndex = 0;
    }

    setup(){

        this.menu_background = createBackgroundOnStage(this.stage,"Resources/Images/SushiHouse-Long.png", CANVAS_WIDTH*19/30);


        var startButton = new Button(this.stage, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 3, "Resources/Images/Menu_Button.png","Resources/Images/Menu_Button_HL.png", "start");
        startButton.choose = function(){
            //go to the other stage

            switchToStoryStage();

        }
        this.buttons.push(startButton);


        var options = new Button(this.stage, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 3 + 96, "Resources/Images/Menu_Options.png","Resources/Images/Menu_Options_HL.png", "options");
        options.choose = function(){
            console.log("options");

        }
        this.buttons.push(options);
        this.changeButton(0);

    }

    update(delta){
        if(this.pause){
            return;
        }
    }

    processInput(key, type) {
        //super.processInput(key, type);
        if(type == 0){
            switch (key){
                case "Enter":
                    this.buttons[this.buttonIndex].choose();
                    break;
                case "up":
                    this.changeButton(-1)
                    break;
                case "down":
                    this.changeButton(+1)
                    break;
                case "left":
                    this.changeButton(-1)
                    break;
                case "right":
                    this.changeButton(+1)
                    break;
                default:
                    break;
            }
        }


    }

    changeButton(direction){
        this.buttonIndex = (this.buttonIndex + direction + this.buttons.length) % this.buttons.length;
        for(var x of this.buttons){
            x.unselect();
        }
        this.buttons[this.buttonIndex].select();
        console.log(this.buttons[this.buttonIndex].text);
    }
}

function switchToStoryStage(){
    ACTIVE_STAGE = storystage;
    app.stage = storystage.stage;
    storystage.unpause();
    fishstage.setpause();
    sushistage.setpause();
    if(music){
        music.pause();
    }

}

function switchToFishingStage(){
    ACTIVE_STAGE = fishstage;
    app.stage = fishstage.stage;
    fishstage.unpause();
    sushistage.unpause();
    pause = false;
    if(music){
        music.pause();
    }
}