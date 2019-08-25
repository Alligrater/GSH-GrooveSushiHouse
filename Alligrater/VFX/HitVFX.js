class HitVFX{
    constructor(){

        var textureArray = [];
        for(var i = 0; i <= 4; i++){
            var texture = PIXI.Texture.from("Resources/Images/VFX/Hit-" + i + ".png");
            textureArray.push(texture);
        }


        
    }
}