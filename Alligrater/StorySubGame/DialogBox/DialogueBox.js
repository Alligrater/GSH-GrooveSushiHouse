
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
        this.dialogue = "";
        this.width = width;
        this.height = height;
        this.x = posx;
        this.y = posy;


        //We need a total of
        this.dbox = new NinePatchBox(stage, DIALOGUEPATH, this.width, this.height, this.x, this.y);
        this.spriteMessage = new SpriteText(stage, "This is a test message from area E13", this.x - this.width/2.1 , this.y - this.height/2.2);
        this.spriteMessage.hideAll();

    }

    update(delta){
        this.dbox.update(delta);
            this.spriteMessage.showNext();

    }

    showDialogue(){
        //
    }

    clearDialogue(){

    }

    setSpeaker(){

    }

    showBox(){

    }

    hideBox(){

    }
}