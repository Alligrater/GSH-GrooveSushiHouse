
const dialogueTextStyle = new PIXI.TextStyle({
    fontFamily: "Zpix",
    fontSize: 12*GLOBAL_SPRITE_SCALE,
    letterSpacing: 1,
    fill: "white"
});

const speakerTextStyle = new PIXI.TextStyle({
    fontFamily: "Born2BSporty",
    fontSize: 16*GLOBAL_SPRITE_SCALE,
    letterSpacing: 1,
    fill: "white"
});


const DIALOGUEBOXPATH = "Resources/Images/UI/DialogueBox_New.png";

class DialogueBox{
    constructor(stage, width, height, posx, posy){


        //Do something.
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

        this.dbox = createBackgroundOnStage(stage, DIALOGUEBOXPATH);//new NinePatchBox(stage, DIALOGUEBOXPATH, this.width, this.height, this.x, this.y);


        this.speakerName = "";
        this.speaker = new PIXI.Text("SPEAKER NAME", speakerTextStyle);
        this.speaker.x = this.x - this.width/3.4;
        this.speaker.y = this.y - this.height/1.16;
        this.speaker.anchor.y = 0.5;

        this.speaker.resolution = 2;
        this.stage.addChild(this.speaker);





        this.text = "IF YOU SEE THIS, SOMETHING HAS WENT WRONG.";//This one will always be the same
        this.displayIndex = 0;
        this.message = new PIXI.Text("IF YOU SEE THIS, SOMETHING HAS WENT WRONG.", dialogueTextStyle);
        this.message.x = this.x - this.width/3.1;
        this.message.y = this.y - this.height/1.75;
        this.message.resolution = 2;
        this.stage.addChild(this.message);




        this.headfigure = null;


    }

    update(delta){

        this.soundCooldown += 1;
        //this.dbox.update(delta);
        if(this.isVisible){
            this.speaker.text = this.speakerName;
        }


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
        if(path != ""){
            this.headfigure = createSpriteOnStage(this.stage,this.x - this.width/2.4, this.y - this.height/1.5, path)
            scaleSprite(this.headfigure, 1.5*GLOBAL_SPRITE_SCALE)
        }
        this.message.x = this.x - this.width/3.1;

    }

    clearHeadFigure(){
        if(this.headfigure){
            this.stage.removeChild(this.headfigure);
            this.headfigure = null;
        }
        //Move the text to the left.
        this.message.x = this.x - this.width/2.5;
    }

    showName(string){
        //this.clearName();
        this.speakerName = string;
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
        this.dbox.visible = true;
        this.message.visible = true;
        //this.speaker.visible = true;
        if(this.headfigure){
            this.headfigure.visible = true;
        }


    }

    hideBox(){
        this.message.visible = false;
        this.dbox.visible = false;
        this.speaker.text = "";
        this.isVisible = false;
        if(this.headfigure){
            this.headfigure.visible = false;
        }
    }
}
