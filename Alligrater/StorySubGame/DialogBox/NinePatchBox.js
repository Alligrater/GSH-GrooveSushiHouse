class NinePatchBox{
    constructor(stage, JSON, width, height, x,y){
        //1. Draw the general plane.

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.mainBody = createTilingSpriteFromJSON(stage,x,y,JSON,"CC", width, height);
        this.topFrame = createTilingSpriteFromJSON(stage,x,y - height/2,JSON,"TC", width, -1, 0.5, 1);
        this.bottomFrame = createTilingSpriteFromJSON(stage,x,y + height/2,JSON,"BC", width, -1, 0.5, 0);

        this.leftFrame = createTilingSpriteFromJSON(stage,x-width/2,y,JSON,"CL", -1, height, 1, 0.5);
        this.rightFrame = createTilingSpriteFromJSON(stage,x+width/2,y,JSON,"CR", -1, height, 0, 0.5);

        this.topLeftFrame = createSpriteFromJSON(stage, x-width/2, y-height/2, JSON, "TL", 1, 1);
        this.topRightFrame = createSpriteFromJSON(stage, x+width/2, y-height/2, JSON, "TR", 0, 1);

        this.bottomLeftFrame = createSpriteFromJSON(stage, x-width/2, y+height/2, JSON, "BL", 1, 0);
        this.bottomRightFrame = createSpriteFromJSON(stage, x+width/2, y+height/2, JSON, "BR", 0, 0);

        this.isResizing = false;
        this.initialwidth = -1;
        this.initialheight = -1;


        this.resizetowidth = -1;
        this.resizetoheight = -1;
        this.resizeSpeed = 20; //20Px per tick, 1200 Px per second.

        this.isMoving = false;
        this.movetox = -1;
        this.movetoy = -1;
        this.moveSpeed = 20;

    }

    update(delta){
        var hasUpdate = false;
        if(this.isResizing){

            if(this.initialwidth > this.resizetowidth){
                this.width -= this.resizeSpeed;
                if(this.width < this.resizetowidth){
                    //If it's smaller than the target, we stop
                    this.width = this.resizetowidth;
                    //We set this to be equal, so this will stop updating.
                    this.initialwidth = this.resizetowidth;
                }
            }
            else if(this.initialwidth < this.resizetowidth){
                this.width += this.resizeSpeed;
                if(this.width > this.resizetowidth){
                    //If it's smaller than the target, we stop
                    this.width = this.resizetowidth;
                    //We set this to be equal, so this will stop updating.
                    this.initialwidth = this.resizetowidth;
                }
            }
            else{
                //Do nothing.
            }

            if(this.initialheight > this.resizetoheight){
                this.height -= this.resizeSpeed;
                if(this.height < this.resizetoheight){
                    //If it's smaller than the target, we stop
                    this.height = this.resizetoheight;
                    //We set this to be equal, so this will stop updating.
                    this.initialheight = this.resizetoheight;
                }
            }
            else if(this.initialheight < this.resizetoheight){
                this.height += this.resizeSpeed;
                if(this.height > this.resizetoheight){
                    //If it's smaller than the target, we stop
                    this.height = this.resizetoheight;
                    //We set this to be equal, so this will stop updating.
                    this.initialheight = this.resizetoheight;
                }
            }
            else{
                //Do nothing.
            }




            if(this.width == this.resizetowidth && this.height == this.resizetoheight){
                this.width = this.resizetowidth;
                this.height = this.resizetoheight;

                this.isResizing = false;
            }
            //Update the dbox:
            hasUpdate = true;
        }
        if(hasUpdate){
            //console.log("Resizing");
            this.update9Patch();
        }
    }

    update9Patch(){
        this.mainBody.x = this.x;
        this.mainBody.y = this.y;
        this.mainBody.width = this.width;
        this.mainBody.height = this.height;

        this.topFrame.x = this.x;
        this.topFrame.y = this.y - this.height/2;
        this.topFrame.width = this.width;

        this.bottomFrame.x = this.x;
        this.bottomFrame.y = this.y + this.height/2;
        this.bottomFrame.width = this.width;

        this.leftFrame.x = this.x - this.width/2;
        this.leftFrame.y = this.y;
        this.leftFrame.height = this.height;

        this.rightFrame.x = this.x + this.width/2;
        this.rightFrame.y = this.y;
        this.rightFrame.height = this.height;

        this.topLeftFrame.x = this.x - this.width/2;
        this.topLeftFrame.y = this.y - this.height/2;

        this.topRightFrame.x = this.x + this.width/2;
        this.topRightFrame.y = this.y - this.height/2;

        this.bottomLeftFrame.x = this.x - this.width/2;
        this.bottomLeftFrame.y = this.y + this.height/2;

        this.bottomRightFrame.x = this.x + this.width/2;
        this.bottomRightFrame.y = this.y + this.height/2;
    }

    resize(width, height){
        this.isResizing = true;
        this.resizetowidth = width;
        this.resizetoheight = height;
        this.initialwidth = this.width;
        this.initialheight = this.height;
    }

    moveto(x,y){

    }

    hide(){
        this.mainBody.visible = false;
        this.topFrame.visible = false;
        this.bottomFrame.visible = false;
        this.leftFrame.visible = false;
        this.rightFrame.visible = false;
        this.topLeftFrame.visible = false;
        this.topRightFrame.visible = false;
        this.bottomLeftFrame.visible = false;
        this.bottomRightFrame.visible = false;

    }

    show(){
        //Does the same thing.
        this.mainBody.visible = true;
        this.topFrame.visible = true;
        this.bottomFrame.visible = true;
        this.leftFrame.visible = true;
        this.rightFrame.visible = true;
        this.topLeftFrame.visible = true;
        this.topRightFrame.visible = true;
        this.bottomLeftFrame.visible = true;
        this.bottomRightFrame.visible = true;
    }
}