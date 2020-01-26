/***************COSTANTI******************/
var BRICK_HEIGHT = 25;


var LONG_PADDLE_WIDTH = 150;
var SHORT_PADDLE_WIDTH = 50;
var POWERUP_STEP = 8;
var POWERUP_DIM = 30;


var BLOCK_WIDTH = 100;
var BLOCK_HEIGHT = 20;

var BALL_RADIUS = 10;
var BALL_STEP = 8;
var MODULUS = BALL_STEP*BALL_STEP + BALL_STEP*BALL_STEP;

var PADDLE_STEP = 7.5;

var ROWS = 5; 


var color = ['', 'yellow', 'orange', 'red', 'unbreakable'];  

function Point(x,y){
	this.x = x;
	this.y = y;
}

/**************FUNZIONI****************/
function between(x, a, b){		//returns true if a <= x < b
	if(x >= a && x < b)
		return true;
	else return false;
}


function normalizeY(new_step_x){
	var new_step_y;
	new_step_y = MODULUS - new_step_x;

	with(Math){
		return sqrt(new_step_y);
	}

}

function normalizeX(new_step_y){
	var new_step_x;
	new_step_x = MODULUS - new_step_y;

	with(Math){
		return sqrt(new_step_x);
	}
}

//mi serve per il powerUp di allungamento paddle: non voglio che, se metto il gioco in pausa, il tempo 'scorra' comunque

var Timer = function(to_call, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function() {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(to_call, remaining);
    };

    this.resume();
};



/*********VARIABILI_GLOBALI*********/
var level = 0;
var LIVES = 3; //vite del giocatore: possibile modificarle a piacere

/*************************/
var HEARTS = LIVES;  //per lo sketcher nel caso si voglia modificare LIVES

var timer;