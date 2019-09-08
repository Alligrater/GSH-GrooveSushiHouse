function createSpriteOnStage(stage, x, y, spriteName, anchorx = 0.5, anchory = 0.5){
    var sprite = new PIXI.Sprite(
        PIXI.loader.resources[spriteName].texture
    );
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    stage.addChild(sprite);

    return sprite;
}

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

function createAnimatedSpriteOnStage(stage, x, y, textures, anchorx = 0.5, anchory = 0.5){
    var sprite = new PIXI.AnimatedSprite(textures);
    //Hanamichi, on Stage!
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.x = anchorx;
    sprite.anchor.y = anchory;
    stage.addChild(sprite);

    return sprite;
}


function createAnimatedSpriteWithJSON(stage,x,y,json,animationName){
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