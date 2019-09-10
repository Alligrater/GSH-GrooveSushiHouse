class Button{
    constructor(stage, x ,y, imagePath, imagePath2, text="button") {
        this.sprite = createSpriteOnStage(stage, x, y, imagePath);
        if(!imagePath2){
            imagePath2 = imagePath;
        }
        this.selectedSprite = createSpriteOnStage(stage, x, y, imagePath2)
        this.selectedSprite.visible = false;

        scaleSprite(this.sprite, GLOBAL_SPRITE_SCALE);
        scaleSprite(this.selectedSprite, GLOBAL_SPRITE_SCALE)
        this.text = text;
    }

    select(){
        //Do a select animation
        //this.sprite.visible = false;
        this.selectedSprite.visible = true;
        //console.log("selected: " + this.text);
    }

    unselect(){
        //unselect
        //this.sprite.visible = true;
        this.selectedSprite.visible = false;
        //console.log("unselected: " + this.text);
    }

    choose(){

    }

}