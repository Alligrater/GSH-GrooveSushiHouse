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
		//General Assets
		.add("Resources/Images/ring_good.png")
		.add("Resources/Images/ring_perfect.png")
		.add("Resources/Images/ring_miss.png")
		//Fishing
		.add("Resources/Images/FishingBackground.png")
		//Fish
		.add("Resources/Images/RegularFish.png")
		.add("Resources/Images/FishHead.png")
		.add("Resources/Images/FishBody.png")
		.add("Resources/Images/FishTail.png")
		.add("Resources/Images/DirectionalFish.png")
		.add("Resources/Images/MashFish.png")
		//Sushi-ing
		.add("Resources/Images/SushiBackground.png")
		//Sushi
		.add("Resources/Images/PlainSushi.png")
		.add("Resources/Images/AnotherSushi.png")
		.add("Resources/Images/GhostSushi.png")
		.add("Resources/Images/Melon.png")

		.add("Resources/Images/SushiHead.png")
		.add("Resources/Images/SushiBody.png")
		.add("Resources/Images/SushiTail.png")
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

var soundcooldown = 0;

//This is good
function update(delta){
	TICK_TIME += 1;
	message.text = (TICK_TIME) + " INDEX: " + ProcessIndex + " COMBO: " + COMBO_COUNT;
	fishingUpdate(delta);
	sushiUpdate(delta);
	soundcooldown += 1;
	if(soundcooldown >= 4){
		isSoundPlaying = false;
		soundcooldown = 0;
	}

}

