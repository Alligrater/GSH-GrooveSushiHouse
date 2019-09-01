
class MenuStage extends GenericStage{
    constructor(){
        super();
    }

    setup(){

        this.menu_background; createSpriteOnStage(this.stage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/Menu_BG.png")

    }

    update(delta){
        if(this.pause){
            return;
        }
    }
}