class StageSwitchAction extends GenericStageAction{
    constructor(JSON){
        super(JSON);
        this.type = "switch-action";
    }

    execute(){
        //Switch to menu stage.
        switchToMenuStage();
    }
}