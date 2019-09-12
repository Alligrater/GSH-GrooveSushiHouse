const BEATMAP_PATH = "./www/Resources/JSON/Beatmap/"

class FreeplayMenuStage extends MenuStage{
    constructor() {
        super();
        this.setVariables();
        this.setup();


    }


    setVariables() {
        super.setVariables();
    }

    setup(){
        this.menu_background = createBackgroundOnStage(this.stage,"Resources/Images/Title.png", CANVAS_WIDTH*19/30);
        this.loadAllMapPaths();
    }

    loadAllMapPaths(){
        var fs = require('fs');
        fs.readdir(BEATMAP_PATH, function(err, items) {
            //console.log(items);

            for (var i=0; i<items.length; i++) {
                console.log(BEATMAP_PATH+items[i]);
            }
        });
    }



}