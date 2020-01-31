function Brick(width, height){
	this.point = new Point(null, null);
	this.width = width;
	this.height = height;
	this.life = 0;
}	


Brick.prototype.coordInit = 
	function(x,y){
		this.point.x = x;
		this.point.y = y;
	}

Brick.prototype.hit = 
	function(ball, y){

		return( this.checkWidth(ball, y) || this.checkHeight(ball) );

	}


Brick.prototype.checkWidth =     //Controllo se ho colpito il lato lungo inferiore o superiore: tolgo e aggiungo 2 perchè va bene anche se la pallina è leggermente spostata 
	function(ball, yLimit){

		var x_Ball = ball.point.x + ball.radius; //coordinata x di riferimento (centro)
		var y_Ball = ball.point.y;				 //coordinata y di riferimento

		if( between(x_Ball, this.point.x - 2, this.point.x + this.width + 2) && 	//lato inferiore
			(y_Ball <= this.point.y + this.height) && ball.stepY < 0
			&& y_Ball + 2*ball.radius >= this.point.y + this.height){
				ball.stepY = -ball.stepY;
				return true;
		}

		if( between(x_Ball, this.point.x - 2, this.point.x + this.width + 2) &&		//lato superiore   
			(y_Ball + 2*ball.radius >= this.point.y) && ball.stepY > 0 && y_Ball <= yLimit
			&& y_Ball <= this.point.y){
				ball.stepY = -ball.stepY;
				return true;
		}

		return false;

	}


Brick.prototype.checkHeight = 	//Controllo se ho colpito il lato corto destro o sinistro
	function(ball){

		var x_Ball = ball.point.x + ball.radius; //coordinata x di riferimento (centro)
		var y_Ball = ball.point.y + ball.radius; //coordianta y di riferimento (centro)

		if( between(y_Ball, this.point.y - 2, this.point.y + this.height + 2) &&	//lato sinistro
			(x_Ball + ball.radius >= this.point.x) && ball.stepX > 0
			&& this.point.x >= x_Ball){
				ball.stepX = -ball.stepX;
				return true;
		}

		if( between(y_Ball, this.point.y - 2, this.point.y + this.height + 2) && 	//lato destro
			(x_Ball - ball.radius <= this.point.x + this.width) && ball.stepX < 0
			 && this.point.x <= x_Ball){
				ball.stepX = -ball.stepX;
				return true;
		}

		return false;

	}