//We need this
var app;




var ACTIVE_STAGE;


//Begin the stage
function beginPixi(){
	//set up the application
	app = new PIXI.Application({
			width: CANVAS_WIDTH,         // default: 800
			height: CANVAS_HEIGHT,        // default: 600
			antialias: false,    // default: false
			transparent: false, // default: false
			resolution: 1,       // default: 1
		}
	);
	document.body.appendChild(app.view);
	app.renderer.backgroundColor = 0x000000;
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	PIXI.settings.ANISOTROPIC_LEVEL = 0;

	PIXI.loader
		.add("Resources/Images/FishingBackground.png")
		.add("Resources/Images/RegularFish.png")
		.add("Resources/Images/ring_good.png")
		.add("Resources/Images/ring_perfect.png")
		.add("Resources/Images/ring_miss.png")
		.add("Resources/Images/FishHead.png")
		.add("Resources/Images/FishBody.png")
		.add("Resources/Images/FishTail.png")
		.add("Resources/Images/PufferFish.png")
		.add("Resources/Images/PufferFish_DIR.png")
		.add("Resources/Images/MashFish.png")
		.add("Resources/Images/SushiBackground.png")
		.add("Resources/Images/PlainSushi.png")
		.add("Resources/Images/AnotherSushi.png")
		.load(setupStage);


}

function setupStage(){
	//Load in the good detection circle
	fishstage = new PIXI.Container();
	sushistage = new PIXI.Container();
	app.stage = fishstage;
	ACTIVE_STAGE = fishstage;

	setupFishingStage();
	setupSushiStage();
	setupAudio();
}

function setupAudio(){
	//Manage IO
	//This has to be loaded differently.
	loadInJson('./www/Resources/JSON/beat.json');
	//Play that track
}


function beginRenderSequence(){
	//Tick, tock, tick
	app.ticker.add(delta => update(delta));

}

//This is good
function update(delta){
	TICK_TIME += 1;
	message.text = (TICK_TIME) + " INDEX: " + ProcessIndex + " COMBO: " + COMBO_COUNT;
	fishingUpdate(delta);
	sushiUpdate(delta);

}


