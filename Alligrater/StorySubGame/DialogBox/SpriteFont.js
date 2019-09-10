const Fonts = {
    SMALL: "Resources/Images/UI/Fonts/fonts.json",
    LARGE: "Resources/Images/UI/NewFonts/fonts.json",
    MISS: 2,
    NOT_IN_RANGE: 3
}

class SpriteText{
    constructor(stage, text, BASE_X, BASE_Y, fontpath = Fonts.SMALL, color=0xffffff){
        this.text = text.toUpperCase();
        this.sprites = new PIXI.Container();

        this.basex = BASE_X;
        this.basey = BASE_Y;
        this.spritelist = [];
        this.showindex = 0;
        this.sheet = PIXI.loader.resources[fontpath].spritesheet;

        this.color = color;

        this.constructSpriteBundle();

        stage.addChild(this.sprites);
    }

    hideAll(){
        for(var x of this.spritelist){
            x.visible = false;
        }
        this.showindex = 0;
    }

    showAll(){
        for(var x of this.spritelist){
            x.visible = true;
        }
        this.showindex = this.spritelist.length - 1;
    }

    showNext(){

        if(this.showindex >= this.spritelist.length){
            return null;
        }
        this.spritelist[this.showindex].visible = true;
        this.showindex += 1;
        return this.text[this.showindex-1]; //Returns the character.
    }

    constructSpriteBundle(){
        var index = 0;
        var headx = this.basex;
        var heady = this.basey;


        for(var x of this.text){

            //Look up on the table.
            var fontSprite;
            if(x != '\n'){
                if(this.sheet.textures[getActualName(x)]){
                    fontSprite = new PIXI.Sprite(
                        this.sheet.textures[getActualName(x)]
                    );
                }
                else{
                    fontSprite =  new PIXI.Sprite(
                        this.sheet.textures[" "]
                    );
                }

                fontSprite.x = headx;
                fontSprite.y = heady;
                fontSprite.tint = this.color;
                scaleSprite(fontSprite, 1.5);
                headx += fontSprite.width;

                this.spritelist.push(fontSprite);
                this.sprites.addChild(fontSprite);
                index += 1;
            }
            else{
                var temp =  new PIXI.Sprite(
                    this.sheet.textures[" "]
                );
                scaleSprite(temp, 2);
                heady += temp.height;
                headx = this.basex;
            }


        }
    }
}

function getActualName(c){
    switch(c){
        case "@":
            return "At";
        case ":":
            return "Colon";
        case ";":
            return "Semicolon";
        case ",":
            return "Comma";
        case ".":
            return "Dot";
        case "\\":
            return "Backlash";
        case "!":
            return "Exclaim";
        case "-":
            return "Hyphen";
        case "%":
            return "Percentage";
        case "+":
            return "Plus";
        case "?":
            return "Question";
        case "*":
            return "Asterisk";
        case "\'":
            return "Apostrophe";
        default:
            return c;

    }
}