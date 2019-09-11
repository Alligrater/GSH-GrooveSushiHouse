class GameAction extends GenericStageAction{
    constructor(JSON){
        super();
    }

    execute() {
        //Load in the rhythm file
        loadinRhythmMap(JSON.beatmap);
        //Wait for it.
    }
}