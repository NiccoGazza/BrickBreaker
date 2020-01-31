/***************COSTANTI******************/
var BRICK_HEIGHT = 25;


var LONG_PADDLE_WIDTH = 150;
var SHORT_PADDLE_WIDTH = 50;
var POWERUP_STEP = 7;
var POWERUP_DIM = 30;


var BLOCK_WIDTH = 100;
var BLOCK_HEIGHT = 20;

var BALL_RADIUS = 10;
var BALL_STEP = 7.5;
var MODULUS = BALL_STEP*BALL_STEP + BALL_STEP*BALL_STEP;

var PADDLE_STEP = 7.5;

var ROWS = 5;
var COLUMNS = 9; 


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

function buildTriangleShape(matrix){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLUMNS; j++){
			if(j != 0 && j != COLUMNS - 1){
				if( i > j || i > COLUMNS - 1 - j){ 
					matrix[i][j].life = 1;
					continue;
				}
				if( i == j || i == COLUMNS - 1 - j){
					matrix[i][j].life = 4;
					continue;
				}
				if(i == 0){
					matrix[i][j].life = 1;
					continue;
				}
				if(i == 1 || i == 2){
					matrix[i][j].life = 2;
					continue;
				}
				if(i == 3){
					matrix[i][j].life = 3;
					continue;
				}
			}
		}
	}
}



function buildMShape(matrix){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLUMNS; j++){
			if( (i == 0) || ((i == j) && (i <= 2)) || ((i == COLUMNS - j - 1) && (j >= 6))
				|| (j == 0) || (j == COLUMNS-1) ){
				matrix[i][j].life = 4; //unbreak.
				continue;
			}
			if(i == 1){
				matrix[i][j].life = 1;
				continue;
			}
			if(i == 2 || i == 3){
				matrix[i][j].life = 2;
				continue;
			}
			if(i == ROWS - 1){
				matrix[i][j].life = 3;
				continue;
			}
		}	
	}	
}

function buildUShape(matrix){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLUMNS; j++){
			if(i == 0 || j == 0 || j == COLUMNS-1){
				matrix[i][j].life = 4;
				continue;
			}
			if(i == 1 || i == 3){
				matrix[i][j].life = 3;
				continue;
			}
			if(i == 2){
				matrix[i][j].life = 2;
				continue;
			}
			if(i == ROWS-1){
				matrix[i][j].life = 1;
				continue;
			}
		}
	}
}


//questa è inguardabile ma non so come fare altirmenti
function buildTrapShape(matrix){
	var dimSubMatrix = 3;


	for(var i = 0; i < dimSubMatrix; i++)
		for(var j = 0; j < dimSubMatrix; j++)
			if(i == j)
				matrix[i][j].life = 4;
			else if(j > i)
				matrix[i][j].life = 3;

	for(var i = 0; i < dimSubMatrix; i++) 
		for(var j = dimSubMatrix*2; j < dimSubMatrix*3; j++)
			if(i == dimSubMatrix*3 - 1 - j)
				matrix[i][j].life = 4;
			else if(dimSubMatrix*3 - 1 - j > i)
				matrix[i][j].life = 3;

	for(var i = 0; i < ROWS; i++){
		for(var j = dimSubMatrix; j < dimSubMatrix*2; j++)
			if(i == 0 || i == ROWS-1)
				matrix[i][j].life = 3;
			else if(i == 1 || i == 3)
				matrix[i][j].life = 2;
			else if(i == 2)
				matrix[i][j].life = 1
	}

	matrix[3][1].life = matrix[4][0].life = matrix[3][7].life = matrix[4][8].life = 4;
	matrix[3][2].life = matrix[3][6].life = 3;
	matrix[4][1].life = matrix[4][2].life = matrix[4][6].life = matrix[4][7].life = 3;

}

function buildLastShape(matrix){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLUMNS; j++){
			if( j == 0 || i == 0 || j == COLUMNS-1){
				matrix[i][j].life = 4;
				continue;
			}
			if( i == ROWS - 1 && (j == 0 || j == 1 || j == 2 || j == 6 || j == 7 || j == COLUMNS-1)){
				matrix[i][j].life = 4;
				continue;
			}
		}
	}
	matrix[3][3].life = matrix[3][5].life =  4;

	for(var i = 0; i < ROWS; i++)
		for(var j = 0; j < COLUMNS; j++)
			if(matrix[i][j].life != 4){
				switch(i){
					case 1: 
						matrix[i][j].life = 1;
						break;
					case 2:
						matrix[i][j].life = 1;
						break;
					case 3:
						matrix[i][j].life = 2;
						break;
					case 4:
						matrix[i][j].life = 3;
						break;
				}
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