
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


        this.stage = stage;


        //We need a total of
        this.dbox = new NinePatchBox(stage, DIALOGUEPATH, this.width, this.height, this.x, this.y);
        this.spriteMessage = new SpriteText(stage, "This is a test message from area E13", this.x - this.width/2.1 , this.y - this.height/2.2);
        this.spriteMessage.hideAll();

    }

    update(delta){
        this.dbox.update(delta);
        if(this.spriteMessage != null && this.isVisible){
            this.spriteMessage.showNext();
        }

    }

    showDialogue(string){
        this.clearDialogue();
        //Show the new dialogue:
        this.spriteMessage = new SpriteText(this.stage, string, this.x - this.width/2.1 , this.y - this.height/2.2);
        //One last thing:
        this.spriteMessage.hideAll()
    }

    clearDialogue(){
        if(this.spriteMessage == null){
            return;
        }
        this.stage.removeChild(this.spriteMessage.sprites);
        this.spriteMessage = null;
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