class HitVFX{
    constructor(stage, x, y){

        var textureArray = [];
        for(var i = 0; i <= 4; i++){
            var texture = PIXI.Texture.from("Resources/Images/VFX/Hit-" + i + ".png");
            textureArray.push(texture);
        }

        this.sprite = createAnimatedSpriteOnStage(fishstage, x, y, textureArray);
        scaleSprite(this.sprite, 4);
        this.sprite.loop = false;
        this.sprite.animationSpeed = 0.8;
        this.playSpriteAnimation();
        this.sprite.onComplete = function(){
            this.visible = false;
        }
    }

    playSpriteAnimation(){
        this.sprite.visible = true;
        this.sprite.gotoAndPlay(0);
    }


}