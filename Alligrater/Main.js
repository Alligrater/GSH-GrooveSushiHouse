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

	loadSprites();


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
	loadAudio();
	loadinRhythmMap('./www/Resources/JSON/Beatmap/beat.json');
	//Play that track
}


function beginRenderSequence(){
	//Tick, tock, tick
	app.ticker.add(delta => update(delta));
}



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

