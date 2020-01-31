
function Ball(playground, step, radius){
	var x = playground.offsetLeft + playground.width/2 - radius;
	var y = playground.offsetTop + playground.height - BLOCK_HEIGHT-2*radius;
	this.point = new Point(x,y);
	this.stepX =  0; //-step
	this.stepY = -Math.sqrt(2*step*step);
	this.radius = radius;
}


Ball.prototype.move = 
	function(playground){
		if((this.point.x <= playground.offsetLeft) || 
			(this.point.x + 2*this.radius >= playground.offsetLeft + playground.width)) //collisione laterale
			this.stepX = -this.stepX;

		if(this.point.y <= playground.offsetTop) //collisione verticale
			this.stepY = -this.stepY;

		this.point.x += this.stepX;
		this.point.y += this.stepY;
	}

Ball.prototype.checkPaddleHit = 
	function(paddle){

			var centerX_ball = this.point.x + this.radius;
			var x_paddle = paddle.point.x; 
			var offset = paddle.width/5;
			var new_stepX, new_stepY;

			if(this.point.y + 2*this.radius >= paddle.point.y){

				if(between(centerX_ball, x_paddle + 2*offset, x_paddle + 3*offset)){ 
					//potrei anche resettare lo step

					new_stepY = 0.9*MODULUS;
					new_stepX = normalizeX(new_stepY);

					this.stepY = -(Math.sqrt(new_stepY));

					if(paddle.flag > 0)
						this.stepX = new_stepX;
					else this.stepX = -new_stepX;

					return;
				}

				if(between(centerX_ball, x_paddle, x_paddle + offset)){   // 90%
					new_stepX = 0.9*MODULUS;
					new_stepY = normalizeY(new_stepX);
					
					this.stepY = -new_stepY;
					if(paddle.flag > 0)
						this.stepX = Math.sqrt(new_stepX);
					else this.stepX = -Math.sqrt(new_stepX);

						
					return;
				}

				if(between(centerX_ball, x_paddle + offset, x_paddle + 2*offset)){ // 60%
					new_stepX = 0.6*MODULUS;
					new_stepY = normalizeY(new_stepX);

					this.stepY = -new_stepY;

					if(this.stepX < 0) //la palla arriva da dx
							this.stepX = -Math.sqrt(new_stepX);
					else 
						this.stepX = Math.sqrt(new_stepX);	

					
					return;
				}

				if(between(centerX_ball, x_paddle + 3*offset, x_paddle + 4*offset)){  // 60%
					new_stepX = 0.6*MODULUS;
					new_stepY = normalizeY(new_stepX);

					this.stepY = -new_stepY;

					if(this.stepX < 0)
						this.stepX = -Math.sqrt(new_stepX);
					else 
						this.stepX = Math.sqrt(new_stepX);


					return;
				}	

				if(between(centerX_ball, x_paddle + 4*offset, x_paddle + 5*offset)){  // 90%
					new_stepX = 0.9*MODULUS;
					new_stepY = normalizeY(new_stepX);

					this.stepY = -new_stepY;

					if(paddle.flag > 0)
						this.stepX = Math.sqrt(new_stepX);
					else this.stepX = -Math.sqrt(new_stepX);

					return;
				}
			}

		
	}

Ball.prototype.checkBottomHit =  
	function(game, playground){
		if(this.point.y + 2*this.radius >= playground.offsetTop + playground.height){ //hit pavimento

			clearInterval(game.ballTimer);
			clearInterval(game.paddleTimer);

			LIVES--;
			game.sketcher.updateLife(LIVES);

			if(LIVES == 0){
				game.gameover();
				return;
			}

			game.resumeButton.disabled = true;
			game.pauseButton.disabled = true;

			setTimeout(function(){			
				game.resetPosition();	
			}, 500);
			
		}

	}

Ball.prototype.resetPosition = 
	function(playground){
		this.point.x =  playground.offsetLeft + playground.width/2 - this.radius;
		this.point.y = playground.offsetTop + playground.height - BLOCK_HEIGHT-2*this.radius;

		this.stepX = 0;
		this.stepY = -Math.sqrt(2*BALL_STEP*BALL_STEP);

		return;
	}