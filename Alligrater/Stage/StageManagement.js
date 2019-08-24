


var message;

function setupFishingStage(){


    fishing_background  = createSpriteOnStage(fishstage,CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/FishingBackground.png");
    fishing_background.scale.x = 2;
    fishing_background.scale.y = 2;
    detection_good = createSpriteOnStage(fishstage,GOOD_HANTEI_X, DEFAULT_SPAWN_POINT_Y, "Resources/Images/ring_good.png");
    scaleSprite(detection_good, 1.5);
    detection_perfect = createSpriteOnStage(fishstage,PERFECT_HANTEI_X, DEFAULT_SPAWN_POINT_Y, "Resources/Images/ring_perfect.png");
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

    message = new PIXI.Text("Hello Pixi!", style);
    fishstage.addChild(message);
}


var sushimessage;

function setupSushiStage(){

    //sushistage
    sushi_background  = createSpriteOnStage(sushistage,CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "Resources/Images/SushiBackground.png");

    createSpriteOnStage(sushistage, SPAWN_X_LEFT, MAP_CENTER_Y, "Resources/Images/ring_perfect.png");
    createSpriteOnStage(sushistage, SPAWN_X_LEFT, MAP_CENTER_Y, "Resources/Images/ring_good.png");

    createSpriteOnStage(sushistage, SPAWN_X_RIGHT, MAP_CENTER_Y, "Resources/Images/ring_perfect.png");
    createSpriteOnStage(sushistage, SPAWN_X_RIGHT, MAP_CENTER_Y, "Resources/Images/ring_good.png");

    createSpriteOnStage(sushistage, MAP_CENTER_X, MAP_CENTER_Y, "Resources/Images/ring_perfect.png");
    createSpriteOnStage(sushistage, MAP_CENTER_X, MAP_CENTER_Y, "Resources/Images/ring_good.png");
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
    sushimessage = new PIXI.Text("Hello Pixi!", style);
    sushistage.addChild(sushimessage);
    sushi_background.scale.x = 2;
    sushi_background.scale.y = 2;

}