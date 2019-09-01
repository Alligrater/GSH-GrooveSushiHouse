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
		//Fishing
		.add("Resources/Images/FishingBackground.png")
		//Fish
		.add("Resources/Images/Fish/RegularFish.png")
		.add("Resources/Images/Fish/FishHead.png")
		.add("Resources/Images/Fish/FishBody.png")
		.add("Resources/Images/Fish/FishTail.png")
		.add("Resources/Images/Fish/DirectionalFish.png")
		.add("Resources/Images/Fish/MashFish.png")
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

		.add("Resources/Images/VFX/Hit-0.png")
		.add("Resources/Images/VFX/Hit-1.png")
		.add("Resources/Images/VFX/Hit-2.png")
		.add("Resources/Images/VFX/Hit-3.png")
		.add("Resources/Images/VFX/Hit-4.png")
		.load(setupStage);


}

function setupStage(){
	//Load in the good detection circle
	fishstage = new PIXI.Container();
	sushistage = new SushiStage();
	app.stage = fishstage;
	ACTIVE_STAGE = fishstage;

	setupFishingStage();
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
	sushistage.update(delta);

	if(soundcooldown >= 5){
		isSoundPlaying = false;
		soundcooldown = 0;
	}
	soundcooldown += 1;

}

