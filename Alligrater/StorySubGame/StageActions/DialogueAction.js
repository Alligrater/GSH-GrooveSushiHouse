class DialogueAction extends GenericStageAction{
    constructor(JSON){
        super();
        this.type = "dialogue-action";
        this.JSON = JSON;
    }

    execute(){
        //Set a new text on the dialogue box.
        //Something.
        storystage.dialogueBox.showDialogue(this.JSON.dialogue);
        storystage.dialogueBox.sound = null;
        if(this.JSON.sound){

            var soundData = this.JSON.sound;

            var volume = soundData.volume==null?0.2:soundData.volume;
            var blip = soundData.blip==null?null:sounds[soundData.blip];
            var frequency = soundData.frequency==null?4:soundData.frequency;
            storystage.dialogueBox.setSound(blip, volume, frequency);

        }
        if(this.JSON.speaker){
            storystage.dialogueBox.showName(this.JSON.speaker);
        }
        if(this.JSON.screenshake){
            storystage.scheduleScreenshake(this.JSON.screenshake.time, this.JSON.screenshake.amount)
        }
    }


}