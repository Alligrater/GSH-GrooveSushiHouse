//We need this
var app;




var ACTIVE_STAGE;
var fishstage;
var sushistage;
var menustage;
var storystage;

var pause = true;

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
	PIXI.ROUND_PIXELS = true;

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

		/*
		.add("Resources/Images/VFX/Hit-0.png")
		.add("Resources/Images/VFX/Hit-1.png")
		.add("Resources/Images/VFX/Hit-2.png")
		.add("Resources/Images/VFX/Hit-3.png")
		.add("Resources/Images/VFX/Hit-4.png")*/
		.add("Resources/Images/VFX/HitVFX.json")
		//.add("Resources/Images/HitVFX.json")


		.add("Resources/Images/Characters/Master/master.json")
		.add("Resources/Images/Characters/Developer/developer.json")
		.add("Resources/Images/UI/DialogueBox.json")
		.add("Resources/Images/UI/Fonts/fonts.json")
		.load(setupStage);


}

function setupStage(){
	//Load in the good detection circle
	fishstage = new FishingStage();
	sushistage = new SushiStage();
	menustage = new MenuStage();
	storystage = new StoryStage();

	fishstage.setpause();
	sushistage.setpause();

	app.stage = menustage.stage;
	ACTIVE_STAGE = menustage;

	loadAllCharacters('./www/Resources/JSON/Characters/')
	loadAllStories('./www/Resources/JSON/Story/')
	setupAudio();
}

function setupAudio(){
	//Manage IO
	//This has to be loaded differently.
	loadinRhythmMap('./www/Resources/JSON/Beatmap/beat.json');
	//Play that track
}


function beginRenderSequence(){
	//Tick, tock, tick
	app.ticker.add(delta => update(delta));

}

var soundcooldown = 0;

//This is good
function update(delta){

	if(!pause){
		TICK_TIME += delta;
		if(soundcooldown >= 5){
			isSoundPlaying = false;
			soundcooldown = 0;
		}
		soundcooldown += 1;
	}

	menustage.update(delta);
	fishstage.update(delta);
	sushistage.update(delta);
	storystage.update(delta);


}

