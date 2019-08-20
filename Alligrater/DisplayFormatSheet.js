/*This file keeps track of all the data values to make sure everything runs properly.
* Positioning objects are done using formulas.*/
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 450;

var TICK_TIME = 0;
var MUSIC_OFFSET = 180; //3 Seconds

var AUTO_PLAY = false;

/*Fishing Stage*/
var PERFECT_HANTEI_X = CANVAS_WIDTH / 4;
var GOOD_HANTEI_X = CANVAS_WIDTH / 4;
var DEFAULT_SPAWN_POINT_Y = CANVAS_HEIGHT * 4 / 5;

var DEFAULT_FISH_SPAWN_X = CANVAS_WIDTH * 9 / 8;
/*Fishing Stage Ends*/


/*Sushi Stage*/
var MAP_CENTER_X = CANVAS_WIDTH / 2;
var MAP_CENTER_Y = CANVAS_HEIGHT * 2 / 3;


var SPAWN_X_LEFT = MAP_CENTER_X - CANVAS_WIDTH/3;
var SPAWN_X_RIGHT = MAP_CENTER_X + CANVAS_WIDTH/3;
var SPAWN_Y_UP = MAP_CENTER_Y - CANVAS_HEIGHT/3;
var SPAWN_Y_DOWN = MAP_CENTER_Y + CANVAS_HEIGHT/3;

//                1/2 WINDOW HEIGHT
var SPAWNDISTANCE_Y = MAP_CENTER_Y + (DEFAULT_FISH_SPAWN_X - PERFECT_HANTEI_X);
var SPAWNDISTANCE_X = MAP_CENTER_X + (DEFAULT_FISH_SPAWN_X - PERFECT_HANTEI_X);
/*Sushi Stage Ends*/