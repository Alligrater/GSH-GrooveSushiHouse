
const style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 14,
    fill: "white",
});

class DialogueBox{
    constructor(stage, width, height, posx, posy){

        var DIALOGUEPATH = "Resources/Images/UI/DialogueBox.json";
        //Do something.
        this.speaker = "";
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


        //We need a total of
        this.dbox = new NinePatchBox(stage, DIALOGUEPATH, this.width, this.height, this.x, this.y);
        this.spriteMessage = new SpriteText(stage, "This is a test message from area E13", this.x - this.width/2.1 , this.y - this.height/2.2);
        this.spriteMessage.hideAll();

    }

    update(delta){
        this.soundCooldown += 1;
        this.dbox.update(delta);
        if(this.spriteMessage != null && this.isVisible && !this.hasComplete){
            var x = this.spriteMessage.showNext();
            //Play the blip sound, if it wants a blip.
            if(x == false){
                this.hasComplete = true;
            }
            else{

                if(this.sound && this.soundCooldown >= this.soundTime){

                    this.sound.play();
                    this.soundCooldown = 0;
                }
            }

        }
        else{
            this.hasComplete = true;
        }

    }

    showDialogue(string){
        this.clearDialogue();
        //Show the new dialogue:
        this.spriteMessage = new SpriteText(this.stage, string, this.x - this.width/2.1 , this.y - this.height/2.2);
        //One last thing:
        this.spriteMessage.hideAll()
        this.hasComplete = false;
    }

    clearDialogue(){
        if(this.spriteMessage == null){
            return;
        }
        this.stage.removeChild(this.spriteMessage.sprites);
        this.spriteMessage = null;
    }

    setSound(sound,volume=0.5, frequency=4){
        this.sound = sound;
        this.volume = volume;
        this.soundTime = frequency;
        if(this.sound){
            this.sound.volume = this.volume;
        }

    }

    setSpeaker(){

    }

    showBox(){
        this.isVisible = true;
        this.dbox.show();
        this.spriteMessage.showAll();
    }

    hideBox(){
        this.spriteMessage.hideAll();
        this.dbox.hide();
        this.isVisible = false;
    }
}