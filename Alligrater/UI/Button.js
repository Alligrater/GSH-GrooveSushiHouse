class Button{
    constructor(stage, x ,y, imagePath, text="button") {
        this.sprite = createSpriteOnStage(stage, x, y, imagePath);
        this.text = text;
    }

    select(){
        //Do a select animation
    }

    unselect(){
        //unselect
    }

    choose(){

    }

}