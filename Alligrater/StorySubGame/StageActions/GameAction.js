class GameAction extends GenericStageAction{
    constructor(JSON){

        super(JSON);
        this.type = "game-action"
    }

    execute() {
        //Load in the rhythm file
        loadinRhythmMap(this.JSON.beatmap);
        //Wait for it.
        storystage.setpause();
        nextStageAction();
        switchToFishingStage();

    }
}