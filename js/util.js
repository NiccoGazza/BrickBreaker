/**************COSTANTI*****************/

var BRICK_HEIGHT = 25;
var BLOCK_WIDTH = 100;
var BLOCK_HEIGHT = 20;
var BALL_RADIUS = 9;
var BALL_STEP = 5;
var PADDLE_STEP = 7.5;
var ROWS = 8; 

function Point(x,y){
	this.x = x;
	this.y = y;
}

/**************FUNZIONI****************/
function between(x, a, b){
	if(x >= a && x < b)
		return true;
	else return false;
}


function normalize(step_y, step_x, new_step_x){
	with(Math){
		var new_step_y;
		new_step_y = step_x*step_x + step_y*step_y - new_step_x*new_step_x;
		console.log(new_step_y);
		new_step_y = abs(new_step_y);
		new_step_y = sqrt(new_step_y);
		console.log(new_step_y);
		
		return new_step_y;
	}

}

/***********VARIABILI**************/
var level = 0;