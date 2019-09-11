var soundcooldown = 0;

function loadAudio(){
    sounds.load([
        "Resources/BGM/7El.mp3",
        "Resources/SE/hit.wav",
        "Resources/SE/blip.wav",
        "Resources/SE/titleintro.wav"
    ]);
    sounds.whenLoaded = beginRenderSequence;
}