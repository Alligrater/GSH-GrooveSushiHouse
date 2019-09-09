class Button{
    constructor(stage, x ,y, imagePath, imagePath2, text="button") {
        this.sprite = createSpriteOnStage(stage, x, y, imagePath);
        if(!imagePath2){
            imagePath2 = imagePath;
        }
        this.selectedSprite = createSpriteOnStage(stage, x, y, imagePath2)
        this.text = text;
    }

    select(){
        //Do a select animation
        this.sprite.visible = false;
        this.selectedSprite.visible = true;
    }

    unselect(){
        //unselect
        this.sprite.visible = true;
        this.selectedSprite.visible = false;
    }

    choose(){

    }

}