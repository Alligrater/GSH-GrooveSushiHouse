class LongSushi extends AbstractSushi{
    constructor(time, side, from){
        super(time, side, from)
        //Basically the same thing.
        var headPath = "Resources/Images/PlainSushi.png";

        this.head = createSpriteOnStage(sushistage, this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
        this.type = "regular-sushi"

    }


}