function Brick(width, height, life){
	this.point = new Point(null, null);
	this.width = width;
	this.height = height;
	this.life = life;
}	


Brick.prototype.coordInit = 
	function(x,y){
		this.point.x = x;
		this.point.y = y;
	}

Brick.prototype.hit = 
	function(ball, y){

		return( this.checkWidth(ball, y) || this.checkHeight(ball));

	}


//AGGIUSTA LO STILE DELLE DUE FUNZIONI

Brick.prototype.checkWidth =     //Controllo se ho colpito il lato lungo inferiore o superiore 
	function(ball, yLimit){

		var x_Ball = ball.point.x + ball.radius; //coordinata x di riferimento (centro)
		var y_Ball = ball.point.y;				 //coordinata y di riferimento

		if( between(x_Ball, this.point.x, this.point.x + this.width) && 	//lato inferiore
			(y_Ball <= this.point.y + this.height) && ball.stepY < 0
			&& this.point.y <= ball.point.y ){
				console.log("colpito sotto");
				ball.stepY = -ball.stepY;	
				return true;
		}

		if( between(x_Ball, this.point.x, this.point.x + this.width) &&		//lato superiore
			(y_Ball >= this.point.y) && ball.stepY > 0 && y_Ball <= yLimit
			&& this.point.y >= ball.point.y){
				console.log("colpito sopra");
				ball.stepY = -ball.stepY;
				return true;
		}

	}


Brick.prototype.checkHeight = 	//Controllo se ho colpito il lato corto destro o sinistro
	function(ball){

		var x_Ball = ball.point.x + ball.radius; //coordinata x di riferimento (centro)
		var y_Ball = ball.point.y + ball.radius; //coordianta y di riferimento (centro)

		if( between(y_Ball, this.point.y, this.point.y + this.height) &&	//lato sinistro
			(x_Ball + ball.radius >= this.point.x) && ball.stepX > 0
			&& this.point.x >= x_Ball){
				console.log("colpito a sx");
				ball.stepX = -ball.stepX;
				return true;
		}

		if( between(y_Ball, this.point.y, this.point.y + this.height) && 	//lato destro
			(x_Ball - ball.radius <= this.point.x + this.width) && ball.stepX < 0
			 && this.point.x <= x_Ball ){
				console.log("colpito a dx");
				ball.stepX = -ball.stepX;
				return true;
		}

	}