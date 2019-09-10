class StoryAction extends GenericStageAction{
    constructor(JSON){
        super();
        //Do something
        this.type = "story-action";
        this.JSON = JSON;
    }

    execute(){
        if(this.JSON.story){
            playStory(this.JSON.story);
        }
        nextStageAction();
    }
}