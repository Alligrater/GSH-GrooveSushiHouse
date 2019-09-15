class StoryAction extends GenericStageAction{
    constructor(JSON){
        super(JSON);
        //Do something
        this.type = "story-action";
    }

    execute(){
        if(this.JSON.story){
            playStory(this.JSON.story);
        }
        nextStageAction();
    }
}