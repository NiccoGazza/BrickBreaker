function Sketcher(playground, playgroundWrapper){
	this.playground = playground;
	this.playgroundWrapper = playgroundWrapper;
}



Sketcher.prototype.drawPlaygroundWrapper = 
	function(playground){
		var playgroundWrapper  = document.getElementById('playgroundWrapper');
		var dim;

		var lives = document.getElementById('lives');
		
		for(var i = 0; i < LIVES; i++){
			var heart = document.createElement('div');
			heart.setAttribute('class', 'heart');
			heart.setAttribute('id', 'heart' + i);  //PER CONTROLLARE OPACITA'
			lives.appendChild(heart);
		}


		lives.style.left = playground.width - LIVES*30 + 'px';

		var divControl = document.getElementById('divControl');
		divControl.style.marginTop = playground.offsetTop - 30 + 'px';
		divControl.style.marginLeft = playground.offsetLeft + 'px';

		var divButton = document.getElementById('divButton');
		divButton.style.marginTop = playground.offsetTop + 'px';
		divButton.style.marginLeft = playground.offsetLeft + playground.width  + 'px';


		var menu = document.getElementById('menu');
		menu.style.marginTop = playground.offsetTop + 'px';
		menu.style.height = playground.height + 'px';
	
	}


Sketcher.prototype.drawBall = 
	function(ball){
		if(ball == null)
			return;

		var _ball = document.getElementById("ball");

		if(_ball == null){
			_ball = document.createElement('div');
			_ball.setAttribute('id', "ball");
			_ball.setAttribute('class', "ball");
			this.playground.appendChild(_ball);
		}

		_ball.style.top = ball.point.y + "px";
		_ball.style.left = ball.point.x + "px";	
	}	

Sketcher.prototype.drawPaddle = 
	function(paddle){
		if(paddle == null)
			return;

		var _paddle = document.getElementById("paddle");

		if(_paddle == null){
			_paddle = document.createElement('div');
			_paddle.setAttribute('id', 'paddle');
			_paddle.setAttribute('class', 'paddle');
			this.playground.appendChild(_paddle);	
		}

		_paddle.style.width = paddle.width + 'px';
		_paddle.style.top = paddle.point.y + 'px';
		_paddle.style.left = paddle.point.x + 'px';

	}

Sketcher.prototype.drawBricks = 
	function(ground){
		if(ground == null)
			return;


		var bricks = ground.configuration;

		for(var i=0; i < ground.rows; i++){
			for(var j=0; j < ground.columns; j++){
				if(bricks[i][j].life > 0){

					var newBrick = document.createElement('div');
					newBrick.setAttribute('id', 'brick'+ (i*ground.columns + j));
					this.playground.appendChild(newBrick);

					newBrick.style.width = ground.brickWidth + 'px';
					newBrick.style.top = bricks[i][j].point.y + 'px';
					newBrick.style.left = bricks[i][j].point.x  + 'px';
					newBrick.setAttribute('class', 'brick ' + color[ bricks[i][j].life ]);
				}
			}
		}
	}

Sketcher.prototype.updateScore = 
	function(){

		var divScore = document.getElementById('score');
		if(divScore != null){
			var scoreSpan = divScore.childNodes[1];
			var score = parseInt(scoreSpan.firstChild.nodeValue);
			score += 3;
			scoreSpan.firstChild.nodeValue = score;
		}
	}

Sketcher.prototype.updateLife = 
	function(life){
		var id = HEARTS - 1 - life ;
		var heart = document.getElementById('heart' + id);
		if(heart == null)
			return;
		heart.style.opacity = 0.3;

	}
	


Sketcher.prototype.changeColor = 
	function(ground, i , j){
		var brick = document.getElementById('brick' + (i*ground.columns + j));
		console.log('cambio colore');

		if(brick != null){
			brick.setAttribute('class', 'brick ' + color[ground.configuration[i][j].life])
			return;
		}
		else console.log("non sono riuscito a cambiare colore");
	}

Sketcher.prototype.getScore = 
	function(){
		var divScore = document.getElementById('score');
		if(divScore != null){
			var scoreSpan = divScore.childNodes[1];
			var score = parseInt(scoreSpan.firstChild.nodeValue);
			return score;
		}
	}