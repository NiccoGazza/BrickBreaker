var game = null;


function begin(){
	game = new Game();
	var resumeButton = document.getElementById('resumeButton');
	var pauseButton = document.getElementById('pauseButton');
	resumeButton.onclick = function(){ resume(game); };
	resumeButton.setAttribute('disabled', true);	
	pauseButton.onclick = function(){ pause(game); };
	pauseButton.setAttribute('disabled', true);
}


function Game(){
	this.playground = new Playground(document.getElementById('playground'));
	this.playgroundWrapper = document.getElementById('playgroundWrapper');
	this.resumeButton = document.getElementById('resumeButton');
	this.pauseButton = document.getElementById('pauseButton');
	this.sketcher = new Sketcher(document.getElementById('playground'), this.playgroundWrapper);	
	this.ball = new Ball(this.playground, BALL_STEP, BALL_RADIUS);
	this.paddle = new Paddle(this.playground, BLOCK_WIDTH, BLOCK_HEIGHT, PADDLE_STEP);
	this.ground = new Ground(this.playground);
	this.spaceFlag = false;
	this.leftFlag = false;
	this.rightFlag = false;
	this.begin = true;

	this.ballTimer = null;
	this.paddleTimer = null;

	window.addEventListener('keydown', this.keyDownHandler.bind(this), false);
	window.addEventListener('keyup', this.keyUpHandler.bind(this), false);

	this.createPlaygroundWrapper();
	this.createPlayground();
}
 
function start(game){
	//Attivo button pausa
	game.pauseButton.disabled = false;

	//Avvio il gioco
	game.ballTimer = setInterval('game.ballClock()', 20);
	game.paddleTimer = setInterval('game.paddleClock()', 20);
}

function pause(game){
	game.resumeButton.disabled = false;
	game.pauseButton.setAttribute('disabled', true);
	clearInterval(game.ballTimer);
	clearInterval(game.paddleTimer);
	return;
}

function resume(game){
	game.pauseButton.disabled = false;
	game.resumeButton.setAttribute('disabled', true);
	game.ballTimer = setInterval('game.ballClock()', 20);
	game.paddleTimer = setInterval('game.paddleClock()', 20);
	return;
}



Game.prototype.keyDownHandler = 
	function(evt){

		//evt.preventDefault(); //Non posso usare shortcut

		evt = (!evt) ? window.event : evt; //Explorer -> !evt
		varkey = (evt.which != null) ? evt.which : evt.keyCode; //Firefox -> evt.which


		switch(varkey){
			case 32: //spacebar
				this.spaceFlag = true;
				break;
			case 37: //left arrow
				this.leftFlag = true;
				break;
			case 39: //right arrow
				this.rightFlag = true;
				break;
			default:
				break;
		}
	}

Game.prototype.keyUpHandler =
	function(evt){
		//evt.preventDefault();

		evt = (!evt) ? window.event : evt; 
		varkey = (evt.which != null) ? evt.which : evt.keyCode;


		switch(varkey){
			case 32: 
				if(this.begin == true){
					start(game);
					this.begin = false;
				}
				this.spaceFlag = false;
				break;
			case 37:
				this.leftFlag = false;
				break;
			case 39:
				this.rightFlag = false;
				break;
			default: break;
		}
	}


Game.prototype.paddleClock = 
	function(){
		var flag = 0;
		if(this.leftFlag && 
			this.paddle.point.x > this.playground.offsetLeft + 4)
			flag = -1;
		if(this.rightFlag && 
		   this.paddle.point.x <= this.playground.offsetLeft 
		   						  + this.playground.width
		   						  - BLOCK_WIDTH -4)
			flag = 1;

		this.paddle.move(flag);
		this.sketcher.drawPaddle(this.paddle);
	}

Game.prototype.ballClock = 
	function(){ 
		this.ball.checkPaddleHit(this.paddle);
		this.ball.checkBricksHit(this.ground);
		this.ball.move(this.playground);
		this.ball.checkBottomHit(game, this.playground);
		this.sketcher.drawBall(this.ball);
	}

Game.prototype.createPlaygroundWrapper = 
function(){
	this.sketcher.drawPlaygroundWrapper(this.playground);
}

Game.prototype.createPlayground = 
function(){
	this.sketcher.drawBall(this.ball);
	this.sketcher.drawPaddle(this.paddle);
	this.sketcher.drawBricks(this.ground);
}