class NinePatchBox{
    constructor(stage, JSON, width, height, x,y){
        //1. Draw the general plane.
        this.mainBody = createTilingSpriteFromJSON(stage,x,y,JSON,"CC", width, height);
        this.topFrame = createTilingSpriteFromJSON(stage,x,y - height/2,JSON,"TC", width, -1, 0.5, 1);
        this.bottomFrame = createTilingSpriteFromJSON(stage,x,y + height/2,JSON,"BC", width, -1, 0.5, 0);

        this.leftFrame = createTilingSpriteFromJSON(stage,x-width/2,y,JSON,"CL", -1, height, 1, 0.5);
        this.rightFrame = createTilingSpriteFromJSON(stage,x+width/2,y,JSON,"CR", -1, height, 0, 0.5);

        this.topLeftFrame = createSpriteFromJSON(stage, x-width/2, y-height/2, JSON, "TL", 1, 1);
        this.topRightFrame = createSpriteFromJSON(stage, x+width/2, y-height/2, JSON, "TR", 0, 1);

        this.bottomLeftFrame = createSpriteFromJSON(stage, x-width/2, y+height/2, JSON, "BL", 1, 0);
        this.bottomRightFrame = createSpriteFromJSON(stage, x+width/2, y+height/2, JSON, "BR", 0, 0);
    }
}