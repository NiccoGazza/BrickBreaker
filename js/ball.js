
function Ball(playground, step, radius){
	var x = playground.offsetLeft + playground.width/2 - BALL_RADIUS;
	var y = playground.offsetTop + playground.height - BLOCK_HEIGHT-2*BALL_RADIUS;
	this.point = new Point(x,y);
	this.stepX = -step;
	this.stepY = -step;
	this.radius = radius;
}


Ball.prototype.move = 
	function(playground){
		if((this.point.x <= playground.offsetLeft) || 
			(this.point.x + 2*BALL_RADIUS >= playground.offsetLeft + playground.width)) //collisione laterale
			this.stepX = -this.stepX;

		if((this.point.y <= playground.offsetTop) ||
		   (this.point.y + 2*BALL_RADIUS >= playground.offsetTop + playground.height))//collisione verticale
			this.stepY = -this.stepY;

		this.point.x += this.stepX;
		this.point.y += this.stepY;
	}

Ball.prototype.checkPaddleHit = 
	function(paddle){
		var centerX_ball = this.point.x + BALL_RADIUS;
		var x_paddle = paddle.point.x; 
		var offset = paddle.width/5;
		var new_stepX, new_stepY;
			
		if(this.point.y + 2*BALL_RADIUS > paddle.point.y){
			if(between(centerX_ball, x_paddle + 40, x_paddle + 60)){ 
				this.stepY = -this.stepY;
				this.stepX = this.stepX/2;
				return;
			}
			if(between(centerX_ball, x_paddle, x_paddle + 20)){
				this.stepY = -this.stepY;
				if(this.stepX > 0)
					this.stepX = -this.stepX*2;
				else 
					this.stepX = this.stepX*2;
				return;
			}

			if(between(centerX_ball, x_paddle + 20, x_paddle + 40)){
				this.stepY = -this.stepY;
				if(this.stepX > 0)
					this.stepX = -this.stepX*1.5;
				else
					this.stepX = this.stepX*1.5;
				return;
			}

			if(between(centerX_ball, x_paddle + 60, x_paddle + 80)){
				this.stepY = -this.stepY;
				if(this.stepX > 0)
					this.stepX = this.stepX*1.5;
				else
					this.stepX = -this.stepX*1.5;
				return;
			}	

			if(between(centerX_ball, x_paddle + 80, x_paddle + 100)){
				this.stepY = -this.stepY;
				if(this.stepX > 0)
					this.stepX = this.stepX*2;
				else
					this.stepX = -this.stepX*2;
				return;
			}
		}

		/*if(this.point.y + 2*BALL_RADIUS > paddle.point.y){
			if(between(centerX_ball, x_paddle + 40, x_paddle + 60)){//Lascio inalterato stepX
				this.stepY = -this.stepY; 
				return;
			}

			if(between(centerX_ball, x_paddle, x_paddle + 20)){

				if(this.stepX > 0)
					new_stepX = -this.stepX*2;
				else 
					new_stepX = this.stepX*2;

				new_stepY = normalize(this.stepY, this.stepX, new_stepX);
				console.log("primo if");
				console.log(new_stepY);
				this.stepY = -new_stepY;
				this.stepX = new_stepX;
				return;
			}

			if(between(centerX_ball, x_paddle + 20, x_paddle + 40)){
				if(this.stepX > 0)
					new_stepX = -this.stepX*1.5;
				else
					new_stepX = this.stepX*1.5;

				new_stepY = normalize(this.stepY, this.stepX, new_stepX);
				console.log("secondo if");
				console.log(new_stepY);
				this.stepY = -new_stepY;
				this.stepX = new_stepX;
				return;
			}

			if(between(centerX_ball, x_paddle + 60, x_paddle + 80)){
				if(this.stepX > 0)
					new_stepX = this.stepX*1.5;
				else
					new_stepX = -this.stepX*1.5;

				new_stepY = normalize(this.stepY, this.stepX, new_stepX);
				console.log("terzo if");
				console.log(new_stepY);
				this.stepY = -new_stepY;
				this.stepX = new_stepX;
				return;
			}	

			if(between(centerX_ball, x_paddle + 80, x_paddle + 100)){
				if(this.stepX > 0)
					new_stepX = this.stepX*2;
				else
					new_stepX = -this.stepX*2;

				new_stepY = normalize(this.stepY, this.stepX, new_stepX);
				console.log("quarto if");
				console.log(new_stepY);
				this.stepY = -new_stepY;
				this.stepX = new_stepX;
				return;
			}
		}*/
	}

Ball.prototype.checkBottomHit =
	function(game, playground){
		if(this.point.y + 2*BALL_RADIUS >= playground.offsetTop + playground.height)//hit pavimento
			clearInterval(game.ballTimer);
	}

