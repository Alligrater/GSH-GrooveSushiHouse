class SushiStage extends GenericStage{
    constructor(){
        super();
        this.setVariables();
        this.setup();
    }

    setVariables(){

        CUR_SUSHI_INDEX = 0;
        this.hasUpdatedQueue = false;

        this.SushiOrderQueue = [];
        this.SushiOrderIndex = 0;

        this.SushiInputQueue = [];
        this.SushiInputIndices = [0, 1, 2, 3];

        this.setpause();
    }

    setup(){

        this.comboCircles = [];

        createBackgroundOnStage(this.stage, "Resources/Images/SushiBackground.png");

        this.comboCircles.push(createSpriteOnStage(this.stage, SPAWN_X_LEFT, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png"));
        this.comboCircles.push(createSpriteOnStage(this.stage, SPAWN_X_RIGHT, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png"));
        this.comboCircles.push(createSpriteOnStage(this.stage, MAP_CENTER_X, SUSHI_TARGET_Y, "Resources/Images/ring_perfect.png"));

        let style = new PIXI.TextStyle({
            fontFamily: "Born2BSporty",
            fontSize: 25*GLOBAL_SPRITE_SCALE,
            fill: "white",
            align: "center"
        });
        let smallstyle = new PIXI.TextStyle({
            fontFamily: "Born2BSporty",
            fontSize: 10*GLOBAL_SPRITE_SCALE,
            fill: "white",
            align: "center"
        });
        this.sushimessage = new PIXI.Text("Hello Pixi!", smallstyle);
        this.sushimessage.anchor.x = 0.5;
        this.sushimessage.x = CANVAS_WIDTH / 2;

        this.combo = new PIXI.Text("Hello Pixi!", style);
        this.combo.x = CANVAS_WIDTH / 2;
        this.combo.anchor.x = 0.5;
        this.combo.y += smallstyle.fontSize;
        this.stage.addChild(this.sushimessage);
        this.stage.addChild(this.combo);



        var perfect_fx_l = new HitVFX(this.stage, SPAWN_X_LEFT, SUSHI_TARGET_Y,"Resources/Images/VFX/HitVFX.json");
        var good_fx_l = new HitVFX(this.stage, SPAWN_X_LEFT, SUSHI_TARGET_Y,"Resources/Images/VFX/GoodVFX.json");

        var perfect_fx_c = new HitVFX(this.stage, MAP_CENTER_X, SUSHI_TARGET_Y,"Resources/Images/VFX/HitVFX.json");
        var good_fx_c = new HitVFX(this.stage, MAP_CENTER_X, SUSHI_TARGET_Y,"Resources/Images/VFX/GoodVFX.json");

        var perfect_fx_r = new HitVFX(this.stage, SPAWN_X_RIGHT, SUSHI_TARGET_Y,"Resources/Images/VFX/HitVFX.json");
        var good_fx_r = new HitVFX(this.stage, SPAWN_X_RIGHT, SUSHI_TARGET_Y,"Resources/Images/VFX/GoodVFX.json");

        this.goodDict = [
            good_fx_l,
            good_fx_c,
            good_fx_r
        ];

        this.perfectDict = [
            perfect_fx_l,
            perfect_fx_c,
            perfect_fx_r
        ]

    }

    update(delta){
        if(this.pause){
            return;
        }

        for(var x = 0; x < this.comboCircles.length; x++){
            this.comboCircles[x].rotation = TICK_TIME/(Math.PI*5);
            this.stage.removeChild(this.goodDict[x]);
            //this.stage.addChild(this.goodDict[x]);
            this.stage.removeChild(this.perfectDict[x]);
            //this.stage.addChild(this.perfectDict[x]);
        }

        this.sushimessage.text = "COMBO:\n";
        this.combo.text = "["+COMBO_COUNT + "]";

        if(ACTIVE_STAGE == this){
            //Begin parsing:

            for(var x = 0; x < this.goodDict.length; x++){
                this.stage.removeChild(this.goodDict[x].sprite);
                this.stage.addChild(this.goodDict[x].sprite);
                this.stage.removeChild(this.perfectDict[x].sprite);
                this.stage.addChild(this.perfectDict[x].sprite);
            }

            if(!this.hasUpdatedQueue){
                this.setVariables();
                this.unpause()
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



    sushiAutoPlay(sushi){
        switch(sushi.type){
            case "junk-sushi":
                //Do nothing
                break;
            case "long-sushi":
                if(Math.round(TICK_TIME)  == sushi.start){
                    processInput("up", 1);
                }
                break;
            default:
                processInput(sushi.side, 1);
        }
    }

    processInput(key, type) {

        //Send input to all 4 keys
        //Cheap fix:
        if(key == "up"){
            key = "down";
        }

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
            if(SushiTemp[index] != null){
                SushiTemp[index].processInput(key, type, TICK_TIME);
            }
        }
    }

    playPerfectFX(side){
        this.perfectDict[side].playSpriteAnimation();
    }

    playGoodFX(side){
        this.goodDict[side].playSpriteAnimation();
    }
}

var DIRECTIONS = ["up", "down", "left", "right"];

function findFirstDir(siq, direction){
    for(var i = 0; i < siq.length; i++){
        if(siq[i].side == direction){
            return i;
        }
    }
    return -1;
}