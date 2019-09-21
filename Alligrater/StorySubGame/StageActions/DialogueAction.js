class DialogueAction extends GenericStageAction{
    constructor(JSON){
        super(JSON);
        this.type = "dialogue-action";

    }

    execute(){
        //Set a new text on the dialogue box.
        //Something.

        this.executeWait();

        if(this.JSON.params){
            //Execute them.
            for(var x of this.JSON.params){
                this.executeParams(x);
            }
        }

        console.log(this.JSON.dialogue);
        storystage.dialogueBox.showDialogue(this.JSON.dialogue, this.autoplay, this.waitTime);
        this.setBlipSound();
        this.showSpeaker();
        this.drawSpeakerHeadfigure();
        this.executeScreenShake();
        this.executeAudio();
    }

    drawSpeakerHeadfigure(){
        if(this.JSON.headfigure != null){
            storystage.dialogueBox.setHeadFigure(this.JSON.headfigure);
        }
        else{
            storystage.dialogueBox.clearHeadFigure();
        }
    }

    showSpeaker(){
        if(this.JSON.speaker){
            storystage.dialogueBox.showName(this.JSON.speaker);
        }
    }

    setBlipSound(){
        storystage.dialogueBox.sound = null;
        if(this.JSON.sound){

            var soundData = this.JSON.sound;

            var volume = soundData.volume==null?0.2:soundData.volume;
            var blip = soundData.blip==null?null:sounds[soundData.blip];
            var frequency = soundData.frequency==null?4:soundData.frequency;
            storystage.dialogueBox.setSound(blip, volume, frequency);

        }
    }

    executeWait() {
        if(this.JSON.wait){
            this.waitTime = this.JSON.wait*70;
        }
    }


}