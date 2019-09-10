
var hasPlayed = false;
class FishingStage extends GenericStage{
    constructor(){
        super();
        this.setup();
    }

    setup(){


        this.Fish_Tank = [];
        this.fishing_background  = createSpriteOnStage(this.stage,CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/FishingBackground.png");
        this.fishing_background.scale.x = CANVAS_WIDTH/this.fishing_background.width;
        this.fishing_background.scale.y = CANVAS_HEIGHT/this.fishing_background.height;


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
        this.message.text = (TICK_TIME) + "\n INDEX: " + ProcessIndex + " COMBO: " + COMBO_COUNT;
        this.detection_perfect.rotation = TICK_TIME/(Math.PI*5);

        if(TICK_TIME >= MUSIC_OFFSET && !hasPlayed){
            music.play();
            hasPlayed = true
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

        if(AUTO_PLAY && this.Fish_Tank[ProcessIndex] != null && TICK_TIME >= this.Fish_Tank[ProcessIndex].start){
            this.fishingAutoPlay();
        }


        for(var n of this.Fish_Tank){
            n.update(TICK_TIME + delta);
        }
    }

    processInput(key, type) {
        if(this.Fish_Tank[ProcessIndex]){
            this.Fish_Tank[ProcessIndex].processInput(key, type, TICK_TIME);
        }
    }


    fishingAutoPlay(){

        switch(this.Fish_Tank[ProcessIndex].type){
            case "directional-fish":
                processInput(this.Fish_Tank[ProcessIndex].direction, 1);
                break;
            case "long-fish":
                if(TICK_TIME == this.Fish_Tank[ProcessIndex].start){
                    processInput("up", 1);
                }
                break;
            case "mash-fish":
                if(TICK_TIME == this.Fish_Tank[ProcessIndex].start){
                    processInput("up", 1);
                }
                else if((TICK_TIME - this.Fish_Tank[ProcessIndex].start) % 5 == 0){
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
        if(this.Fish_Tank[ProcessIndex] != null){
            this.Fish_Tank[ProcessIndex].enabled = false;
            this.Fish_Tank[ProcessIndex].unregisterSelf();
        }
        ProcessIndex += 1;
    }

}