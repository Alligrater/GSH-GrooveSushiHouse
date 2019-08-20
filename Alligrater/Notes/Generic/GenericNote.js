var CURRENT_NOTE_INDEX = 0;
class GenericNote{
    constructor(time){
        this.start = time;
        this.type = "generic";
        this.enabled = true;
        this.isReady = false;
        this.head = null;
        this.index = CURRENT_NOTE_INDEX;

        this.stage = app.stage;

        CURRENT_NOTE_INDEX += 1;
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 40){
            console.log("disable!");
            this.enabled = false;
            return;
        }
    }

    processMissEvent(){
        doMiss();
    }


    unregisterSelf(){
        //Do nothing
        this.stage.removeChild(this.head);
    }


}