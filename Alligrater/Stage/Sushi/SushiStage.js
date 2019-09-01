class SushiStage extends GenericStage{
    constructor(){
        super();
        this.hasUpdatedQueue = false;

        this.SushiOrderQueue = [];
        this.SushiOrderIndex = 0;


        this.SushiInputQueue = [];
        this.SushiInputIndices = [0, 1, 2, 3];
    }

    update(delta){
        if(this.pause){
            return;
        }

        this.sushimessage.text = (TICK_TIME) + " INDEX: " + sushistage.SushiInputIndices + " COMBO: " + COMBO_COUNT;

        if(ACTIVE_STAGE == this){
            //Begin parsing:
            if(!this.hasUpdatedQueue){
                while(BeatMap[BeatIndex] != null && BeatMap[BeatIndex].type != "switch"){
                    //Do work
                    this.SushiOrderQueue.push(BeatMap[BeatIndex]);

                    //Then increment
                    BeatIndex += 1;
                }
                this.hasUpdatedQueue = true;
            }

            if(this.SushiOrderQueue[this.SushiOrderIndex] != null && TICK_TIME >= this.SushiOrderQueue[this.SushiOrderIndex].start + MUSIC_OFFSET - BeatSpeed){
                //Summon Sushi
                for(var i = 0; i < 4; i++){
                    if(this.SushiOrderQueue[this.SushiOrderIndex + i] != null) {
                        summonSushi(this.SushiOrderQueue[this.SushiOrderIndex + i]);
                    }
                }

                this.SushiOrderIndex += 4;
            }


            if(AUTO_PLAY){
                for(var index of this.SushiInputIndices){
                    if(this.SushiInputQueue[index] != null && TICK_TIME >= this.SushiInputQueue[index].start){
                        //Process Input
                        this.sushiAutoPlay(this.SushiInputQueue[index]);
                    }
                }
            }

            //Update All Sushi
            for(var x of this.SushiInputQueue){
                x.update(TICK_TIME);
            }

        }
    }

    setup(){
        //sushistage
        if(this.pause){
            return;
        }
        this.sushi_background  = createSpriteOnStage(this.stage,CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/SushiBackground.png");

        createSpriteOnStage(this.stage, SPAWN_X_LEFT, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png");
        createSpriteOnStage(this.stage, SPAWN_X_LEFT, SUSHI_TARGET_Y, "Resources/Images/ring_good.png");

        createSpriteOnStage(this.stage, SPAWN_X_RIGHT, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png");
        createSpriteOnStage(this.stage, SPAWN_X_RIGHT, SUSHI_TARGET_Y, "Resources/Images/ring_good.png");

        createSpriteOnStage(this.stage, MAP_CENTER_X, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png");
        createSpriteOnStage(this.stage, MAP_CENTER_X, SUSHI_TARGET_Y, "Resources/Images/ring_good.png");
        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        this.sushimessage = new PIXI.Text("Hello Pixi!", style);
        this.stage.addChild(this.sushimessage);
        this.sushi_background.scale.x = 2;
        this.sushi_background.scale.y = 2;
    }

    sushiAutoPlay(sushi){
        switch(sushi.type){
            case "junk-sushi":
                //Do nothing
                break;
            default:
                processInput(sushi.side, 1);
        }
    }

    processInput(key, type) {

        //Send input to all 4 keys
        //Cheap fix:
        var SushiTemp = [];
        for(var i = 0; i < this.SushiInputIndices.length; i++){
            //send to all 4
            var index = this.SushiInputIndices[i];

            if(this.SushiInputQueue[index] != null){
                SushiTemp.push(this.SushiInputQueue[index]);
            }
        }

        for(var i = 0; i < 4; i++){
            var index = findFirstDir(SushiTemp, DIRECTIONS[i]);

            //console.log("First " + DIRECTIONS[i] + ": " + index);
            if(SushiTemp[index] != null){
                //console.log(SushiTemp[index])
                SushiTemp[index].processInput(key, type, TICK_TIME);
            }
        }
        //console.log("===========")
    }
}