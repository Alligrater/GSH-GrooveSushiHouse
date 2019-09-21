
const dialogueTextStyle = new PIXI.TextStyle({
    fontFamily: "Zpix",
    fontSize: 12*GLOBAL_SPRITE_SCALE,
    letterSpacing: 1,
    fill: "white"
});


const DIALOGUEBOXPATH = "Resources/Images/UI/DialogueBox.json";

class DialogueBox{
    constructor(stage, width, height, posx, posy){


        //Do something.
        this.speaker = null;
        this.width = width;
        this.height = height;
        this.x = posx;
        this.y = posy;

        this.isVisible = true;
        this.hasComplete = false;

        this.sound = null;
        this.volume = 0.5; //Default
        this.soundCooldown = 0;
        this.soundTime = 2;



        this.stage = stage;
        this.autoplay = false;

        this.waitTime = 0;
        this.targetWaitTime = 0;


        this.dbox = new NinePatchBox(stage, DIALOGUEBOXPATH, this.width, this.height, this.x, this.y);

        //We need a total of
        this.text = "IF YOU SEE THIS, SOMETHING HAS WENT WRONG.";//This one will always be the same
        this.displayIndex = 0;
        this.message = new PIXI.Text("IF YOU SEE THIS, SOMETHING HAS WENT WRONG.", dialogueTextStyle);
        this.message.x = this.x - this.width/2.1;
        this.message.y = this.y - this.height/2.1;
        this.message.resolution = 2;
        this.stage.addChild(this.message);

        this.headfigure = null;


    }

    update(delta){
        this.soundCooldown += 1;
        this.dbox.update(delta);

        if(this.isVisible && !this.hasComplete && this.message){
            this.displayIndex += 1;
            //This gets the character.
            this.message.text = this.text.substr(0, this.displayIndex)
            if(this.displayIndex >= this.text.length){
                this.hasComplete = true;
            }
            else{
                var x = this.text[this.displayIndex];
                if(x == " "){
                    this.soundCooldown = this.soundTime/2;
                }
                if(this.sound && this.soundCooldown >= this.soundTime){

                    this.sound.play();
                    this.soundCooldown = 0;
                }
            }

        }
        else{
            this.hasComplete = true;
            this.waitTime += 1;
            if(this.autoplay == true){
                if(this.waitTime >= this.targetWaitTime){
                    console.log("hasComplete");
                    nextStageAction();
                }

            }
        }
        return this.hasComplete;

    }

    bringToFront(){
        //storystage.stage.removeChild(this.dbox);
        storystage.stage.removeChild(this.message);
        storystage.stage.removeChild(this.dbox);
    }

    setHeadFigure(path){
        this.clearHeadFigure();
        this.headfigure = createSpriteOnStage(this.stage,this.x - this.width/2.1, this.y - this.height/1.7, path)
    }

    clearHeadFigure(){
        if(this.headfigure){
            this.stage.removeChild(this.headfigure);
            this.headfigure = null;
        }
    }

    showName(string){
        this.clearName();
        this.speaker = new SpriteText(this.stage, string, this.x - this.width/2.1 , this.y - this.height/1.7, Fonts.LARGE);
    }

    clearName(){
        if(this.speaker){
            this.stage.removeChild(this.speaker.sprites);
            this.speaker = null;
        }

    }

    skipDialogue(){
        this.hasComplete = true;
        this.message.text = this.text;
    }


    showDialogue(string, autoplay = false, targetWaitTime = 0){
        this.clearDialogue();
        //Show the new dialogue:
        this.text = string;
        //One last thing:
        this.hasComplete = false;
        this.displayIndex = 0;

        this.autoplay = autoplay;
        this.targetWaitTime = targetWaitTime;
        this.waitTime = 0;
    }


    clearDialogue(){
        this.message.text = ""
    }

    setSound(sound,volume=0.5, frequency=4){
        this.sound = sound;
        this.volume = volume;
        this.soundTime = frequency;
        if(this.sound){
            this.sound.volume = this.volume;
        }

    }


    showBox(){
        this.isVisible = true;
        this.dbox.show();
        this.message.visible = true;
        if(this.speaker){
            this.speaker.showAll();
        }

    }

    hideBox(){
        this.message.visible = false
        this.dbox.hide();
        if(this.speaker){
            this.speaker.hideAll();
        }
        this.isVisible = false;
    }
}
