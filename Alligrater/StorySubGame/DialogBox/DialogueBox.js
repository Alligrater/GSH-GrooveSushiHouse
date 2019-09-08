

class DialogueBox{
    constructor(width, height, posx, posy){

        var DIALOGUEPATH = "Resources/Images/UI/DialogueBox.json";
        //Do something.
        this.speaker = "";
        this.dialogue = "";
        this.width = width;
        this.height = height;
        this.x = posx;
        this.y = posy;


        //We need a total of
        this.dbox = new NinePatchBox(storystage.stage, DIALOGUEPATH, this.width, this.height, this.x, this.y);
    }

    showDialogue(){

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