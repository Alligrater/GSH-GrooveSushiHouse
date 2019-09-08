

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
    }

    update(delta){
        this.dbox.update(delta);
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