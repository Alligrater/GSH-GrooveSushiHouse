class ResultsStage extends GenericStage{
    constructor(){
        super();
        this.setVariables();
        this.setup();
    }

    setVariables(){
        this.displayScore = 0;
    }

    setup(){
        //Load in background
        this.background = createBackgroundOnStage(this.stage, "Resources/Images/ResultsBackground.png");
        
    }
}