function Sketcher(playground, playgroundWrapper){
	this.playground = playground;
	this.playgroundWrapper = playgroundWrapper;
}



Sketcher.prototype.drawPlaygroundWrapper = 
	function(playground){

		var lives = document.getElementById('lives');
		for(var i = 0; i < 3; i++){
			var offset = 40;
			var heart = document.createElement('div');
			heart.setAttribute('class', 'heart');
			heart.setAttribute('id', 'heart' + i);  //PER CONTROLLARE OPACITA'
			lives.appendChild(heart);
			heart.style.left = offset + 'px'; //allineo al playground
		}

		var divControl = document.getElementById('divControl');
		divControl.style.marginTop = playground.offsetTop - 30 + 'px';
		divControl.style.marginLeft = playground.offsetLeft + 'px';

		var divButton = document.getElementById('divButton');
		divButton.style.marginTop = playground.offsetTop + 'px';
		divButton.style.marginLeft = playground.offsetLeft + playground.width  + 'px';
	
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

		_paddle.style.top = paddle.point.y + "px";
		_paddle.style.left = paddle.point.x + "px";
	}

Sketcher.prototype.drawBricks = 
	function(ground){
		if(ground == null)
			return;


		var bricks = ground.configuration;

		for(var i=0; i < ground.rows; i++){
			for(var j=0; j < ground.columns; j++){
				if(bricks[i][j].life == 1){
					var newBrick = document.createElement('div');
					newBrick.setAttribute('class', 'brick');
					newBrick.setAttribute('id', 'brick'+ (i*ground.columns + j));
					this.playground.appendChild(newBrick);

					newBrick.style.top = bricks[i][j].point.y + 'px';
					newBrick.style.left = bricks[i][j].point.x  + 'px';
				}
			}
		}
	}