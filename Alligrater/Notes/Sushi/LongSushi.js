class LongSushi extends AbstractSushi{
    constructor(time, stop, side, from){
        super(time, side, from);
        //Basically the same thing.

        var headPath = "Resources/Images/SushiHead.png";
        var bodyPath = "Resources/Images/SushiBody.png";
        var tailPath = "Resources/Images/SushiTail.png";

        this.type = "long-sushi";
        this.stop = stop;
        this.isHolding = false;
        this.isReady = false;

        var headSample = createSpriteOnStage(sushistage,this.x, this.y, headPath);
        scaleSprite(headSample, 1.2);

        this.bodyLength = (this.stop - this.start) * this.vely + headSample.height;


        this.body = createTilingSpriteOnStage(sushistage, this.x, this.y - headSample.height / 2, bodyPath, -1, this.bodyLength/1.2, 0.5, 0.0);
        scaleSprite(this.body, 1.2);

        //Tail
        this.tail = createSpriteOnStage(sushistage,this.x,
            this.y - (this.stop - this.start) * this.vely, tailPath);
        scaleSprite(this.tail, 1.2);

        this.head = createSpriteOnStage(sushistage,this.x, this.y, headPath);
        scaleSprite(this.head, 1.2);
    }

    update(currentTime){
        if(this.enabled != true){
            return;
        }
        if(currentTime >= this.start + 10){
            console.log("disable!");
            this.enabled = false;
            this.processMissEvent();
            console.log("miss")
            return;
        }
        this.head.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.head.y = this.y - this.vely * (currentTime - this.start + BeatSpeed);


        this.body.x = this.x - this.velx * (currentTime - this.start + BeatSpeed);
        this.body.y = this.y - this.head.height / 2 - this.vely * (currentTime - this.start + BeatSpeed);

        this.tail.x = this.x + (this.stop - this.start) * this.velx - this.velx * (currentTime - this.start + BeatSpeed);
        this.tail.y = this.y + (this.stop - this.start) * this.vely - this.vely * (currentTime - this.start + BeatSpeed);
    }


}