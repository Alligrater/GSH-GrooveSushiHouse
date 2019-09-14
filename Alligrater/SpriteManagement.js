function loadSprites(){
    PIXI.loader
    //General Assets
        .add("Resources/Images/ring_perfect.png")
        //RhythmGame
        .add("Resources/Images/FishingBackground.png")
        .add("Resources/Images/FishingRockOverlay.png")
        //Fish
        .add("Resources/Images/Fish/RegularFish.png")
        .add("Resources/Images/Fish/FishHead.png")
        .add("Resources/Images/Fish/FishBody.png")
        .add("Resources/Images/Fish/FishTail.png")
        .add("Resources/Images/Fish/DirectionalFish.png")
        .add("Resources/Images/Fish/MashFish.png")
        .add("Resources/Images/Fish/Arrow.png")
        //Sushi-ing
        .add("Resources/Images/SushiBackground.png")
        //Sushi
        .add("Resources/Images/Sushi/PlainSushi.png")
        .add("Resources/Images/Sushi/AnotherSushi.png")
        .add("Resources/Images/Sushi/GhostSushi.png")
        .add("Resources/Images/Sushi/Melon.png")

        .add("Resources/Images/Sushi/SushiHead.png")
        .add("Resources/Images/Sushi/SushiBody.png")
        .add("Resources/Images/Sushi/SushiTail.png")

        //Menu
        .add("Resources/Images/Menu_BG.png")
        .add("Resources/Images/Menu_Button.png")
        .add("Resources/Images/Menu_Button_HL.png")
        .add("Resources/Images/Menu_Options.png")
        .add("Resources/Images/Menu_Options_HL.png")


        .add("Resources/Images/ResultsBackground.png")
        .add("Resources/Images/StoryBackground.png")
        .add("Resources/Images/SushiHouse.png")
        //.add("Resources/Images/SushiHouse-Night.png")
        .add("Resources/Images/SushiHouse-Long.png")
        .add("Resources/Images/Title.png")


        .add("Resources/Images/VFX/HitVFX.json")
        //.add("Resources/Images/HitVFX.json")


        .add("Resources/Images/Characters/Master/master.json")
        .add("Resources/Images/Characters/Developer/developer.json")
        .add("Resources/Images/UI/DialogueBox.json")
        .add("Resources/Images/UI/Fonts/fonts.json")
        .add("Resources/Images/UI/NewFonts/fonts.json")
        .load(setupStage);
}

function createBackgroundOnStage(stage, spriteName, x = CANVAS_WIDTH/2, y = CANVAS_HEIGHT/2){
    var sprite = new PIXI.Sprite(
        PIXI.loader.resources[spriteName].texture
    );


    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    var scale;
    if(sprite.width > sprite.height){
        scale = CANVAS_HEIGHT/sprite.height;
    }
    else{
        scale = CANVAS_WIDTH/sprite.width;
    }

    scaleSprite(sprite, scale);

    stage.addChildAt(sprite, 0);
    return sprite;

}


function createSpriteOnStage(stage, x, y, spriteName, zIndex = 1, anchorx = 0.5, anchory = 0.5){
    var sprite = new PIXI.Sprite(
        PIXI.loader.resources[spriteName].texture
    );
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    sprite.zIndex = 1;
    stage.addChild(sprite);

    return sprite;
}

/*
function createSpriteWithTexture(stage, x, y, texture, anchorx = 0.5, anchory = 0.5){
    var sprite = new PIXI.Sprite(
        texture
    );
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    stage.addChild(sprite);

    return sprite;
}*/

function createSpriteFromJSON(stage, x, y, JSON, spriteName, anchorx = 0.5, anchory = 0.5){
    if(!PIXI.loader.resources[JSON]){
        return;
    }
    var sheet = PIXI.loader.resources[JSON].spritesheet;
    var sprite = new PIXI.Sprite(
        sheet.textures[spriteName]
    );
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    stage.addChild(sprite);

    return sprite;
}

function createTilingSpriteOnStage(stage, x, y, spriteName, width = -1, height = -1, anchorx = 0.0, anchory = 0.5){
    var sprite = new PIXI.TilingSprite(
        PIXI.loader.resources[spriteName].texture
    );

    sprite.x = x;
    sprite.y = y;
    stage.addChild(sprite);

    var spriteSample = new PIXI.Sprite(
        PIXI.loader.resources[spriteName].texture
    );
    if(width == -1 ){
        width = spriteSample.width;
    }
    if(height == -1){
        height = spriteSample.height;
    }

    sprite.width = width;
    sprite.height = height;

    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;

    return sprite;
}

function createTilingSpriteFromJSON(stage,x,y,JSON,textureName,width=-1,height=-1,anchorx=0.5,anchory=0.5){
    if(!PIXI.loader.resources[JSON]){
        return;
    }
    var sheet = PIXI.loader.resources[JSON].spritesheet;
    var sprite = new PIXI.TilingSprite(
        sheet.textures[textureName]
    );

    sprite.x = x;
    sprite.y = y;
    stage.addChild(sprite);

    var spriteSample = new PIXI.Sprite(
        sheet.textures[textureName]
    );
    if(width == -1 ){
        width = spriteSample.width;
    }
    if(height == -1){
        height = spriteSample.height;
    }
    sprite.width = width;
    sprite.height = height;

    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;

    return sprite;
}

/*
function createAnimatedSpriteOnStage(stage, x, y, textures, anchorx = 0.5, anchory = 0.5){
    var sprite = new PIXI.AnimatedSprite(textures);
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    stage.addChild(sprite);

    return sprite;
}*/


function createAnimatedSpriteWithJSON(stage,x,y,json,animationName){
    if(!PIXI.loader.resources[json]){
        return;
    }
    var sheet = PIXI.loader.resources[json].spritesheet;
    //console.log(sheet);
    var sprite = new PIXI.AnimatedSprite(sheet.animations[animationName]);
    sprite.x = x;
    sprite.y = y;
    stage.addChild(sprite);
    return sprite;
}

function scaleSprite(sprite, scale){
    sprite.scale.x = scale;
    sprite.scale.y = scale;
}