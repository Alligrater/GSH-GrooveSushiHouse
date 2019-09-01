class GenericStage{

    constructor(){
        this.pause = false;
        //this.x = x;
        //this.y = y;
        this.stage = new PIXI.Container();

        this.setup();
    }

    update(delta){
        if(this.pause){
            return;
        }
        else{
            //update....
        }
    }

    pause(){
        this.pause = true;
    }

    unpause(){
        this.pause = false;
    }

    togglePause(){
        if(this.pause){
            this.pause = false;
        }
        else{
            this.pause = true;
        }
    }

    setup(){

    }

    processInput(){

    }
}