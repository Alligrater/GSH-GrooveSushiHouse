var soundcooldown = 0;

function loadAudio(){
    sounds.load([
        "Resources/BGM/unreal_superhero_3.mp3",
        "Resources/BGM/dance_in_the_stars.wav",
        "Resources/BGM/7El.mp3",
        "Resources/SE/menu.mp3",
        "Resources/SE/hit.wav",
        "Resources/SE/blip.wav",
        "Resources/SE/titleintro.wav"
    ]);
    sounds.whenLoaded = beginRenderSequence;
}