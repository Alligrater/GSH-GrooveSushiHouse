const FONTPATH = "Resources/Images/UI/Fonts/fonts.json";
class SpriteText{
    constructor(stage, text, BASE_X, BASE_Y){
        this.text = text.toUpperCase();
        this.sprites = new PIXI.ParticleContainer(300, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });

        this.basex = BASE_X;
        this.basey = BASE_Y
        this.spritelist = [];
        this.sheet = PIXI.loader.resources[FONTPATH].spritesheet;

        this.constructSpriteBundle();

        stage.addChild(this.sprites);
    }

    constructSpriteBundle(){
        var index = 0;
        var headx = this.basex;
        var heady = this.basey;


        for(var x of this.text){
            //Look up on the table.
            var fontSprite;
            if(x != '\n'){
                if(this.sheet.textures[x]){
                    fontSprite =  new PIXI.Sprite(
                        this.sheet.textures[x]
                    );
                }
                else{
                    fontSprite =  new PIXI.Sprite(
                        this.sheet.textures[" "]
                    );
                }

                fontSprite.x = headx;
                fontSprite.y = heady;

                headx += fontSprite.width;

                this.spritelist.push(fontSprite);
                this.sprites.addChild(fontSprite);
                index += 1;
            }
            else{
                var temp =  new PIXI.Sprite(
                    this.sheet.textures[" "]
                );
                heady += temp.height;
            }


        }
    }
}