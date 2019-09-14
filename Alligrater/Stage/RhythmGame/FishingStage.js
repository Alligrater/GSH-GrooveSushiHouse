

class FishingStage extends GenericStage{
    constructor(){
        super();
        this.setVariables();
        this.setup();
    }

    setVariables() {
        this.Fish_Tank = [];
        this.ProcessIndex = 0;
        this.totalTime = 0;
        this.hasPlayed = false;
        this.setpause();
    }

    setup(){
        //Graphical Ones Here:
        this.fishing_overlay = createBackgroundOnStage(this.stage, "Resources/Images/FishingRockOverlay.png");
        this.fishing_background = createBackgroundOnStage(this.stage, "Resources/Images/FishingBackground.png");
        this.detection_perfect = createSpriteOnStage(this.stage,FISH_TARGET_X, DEFAULT_SPAWN_POINT_Y, "Resources/Images/ring_perfect.png");
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
        this.message = new PIXI.Text("Hello Pixi!", style);
        this.fish_hit_fx = new HitVFX(this.stage, FISH_TARGET_X, DEFAULT_SPAWN_POINT_Y);
        this.stage.addChild(this.message);
    }

    update(delta){

        if(this.pause){
            return;
        }

        if(TICK_TIME >= musicLength){
            //switch back to the other stage.
            switchToStoryStage();
        }

        this.message.text = (TICK_TIME) + "\n Index: " + this.ProcessIndex + " Combo: " + COMBO_COUNT;
        this.detection_perfect.rotation = TICK_TIME/(Math.PI*5);
        //this.fishing_overlay.zIndex = 99;
        this.stage.removeChild(this.fishing_overlay);
        this.stage.addChild(this.fishing_overlay);

        this.stage.removeChild(this.fish_hit_fx.sprite);
        this.stage.addChild(this.fish_hit_fx.sprite);

        if(TICK_TIME >= MUSIC_OFFSET && !this.hasPlayed){
            music.restart();
            this.hasPlayed = true
        }


        if(BeatMap[BeatIndex] != null){
            if(BeatMap[BeatIndex].type != "switch" && TICK_TIME >= BeatMap[BeatIndex].start + MUSIC_OFFSET - BeatSpeed){
                summonFish(BeatMap[BeatIndex]);
                BeatIndex += 1;
            }
            else if(BeatMap[BeatIndex].type == "switch" && TICK_TIME >= BeatMap[BeatIndex].start + MUSIC_OFFSET){
                //Switch to a new stage:
                if(app.stage == fishstage.stage){
                    app.stage = sushistage.stage;
                    ACTIVE_STAGE = sushistage;
                }
                else{
                    app.stage = fishstage.stage;
                    ACTIVE_STAGE = fishstage;
                }
                sushistage.hasUpdatedQueue = false;
                console.log("switch!");
                BeatIndex += 1;
            }
        }

        if(AUTO_PLAY && this.Fish_Tank[this.ProcessIndex] != null && TICK_TIME >= this.Fish_Tank[this.ProcessIndex].start){
            this.fishingAutoPlay();
        }


        for(var n of this.Fish_Tank){
            n.update(TICK_TIME + delta);
        }
    }

    processInput(key, type) {
        if(this.Fish_Tank[this.ProcessIndex]){
            this.Fish_Tank[this.ProcessIndex].processInput(key, type, TICK_TIME);
        }
    }


    fishingAutoPlay(){

        switch(this.Fish_Tank[this.ProcessIndex].type){
            case "directional-fish":
                processInput(this.Fish_Tank[this.ProcessIndex].direction, 1);
                break;
            case "long-fish":
                if(TICK_TIME  >= this.Fish_Tank[this.ProcessIndex].start){
                    processInput("up", 1);
                }
                break;
            case "mash-fish":
                if(TICK_TIME >= this.Fish_Tank[this.ProcessIndex].start){
                    processInput("up", 1);
                }
                else if(Math.floor((TICK_TIME) - this.Fish_Tank[this.ProcessIndex].start) % 5 == 0){
                    processInput("up", 1);
                }
                else{
                    //Do nothing
                }
                break;
            default:
                processInput("up", 1);
        }
    }

    nextFish(){
        if(this.Fish_Tank[this.ProcessIndex] != null){
            this.Fish_Tank[this.ProcessIndex].enabled = false;
            this.Fish_Tank[this.ProcessIndex].unregisterSelf();
        }
        this.ProcessIndex += 1;
    }

    cleanup(){
        //Clean up everything.
    }

}