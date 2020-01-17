function Ground(playground){
	this.playground = playground;
	this.topSpace = 20; //piccolo spazio in alto
	this.sideSpace = 10; //piccolo spazio ai lati

	this.rows = ROWS;
	this.columns = Math.trunc( (this.playground.width - 2*this.sideSpace) / BLOCK_WIDTH);

	this.count = this.rows*this.columns; //Quanti mattoncini ci sono

	this.offset = 0;

	this.configuration = [];
	this.level = level; //all'inizio è 0

	this.createBricks();
}



Ground.prototype.createBricks = 
	function(){
		//console.log(this.rows);
		//console.log(this.columns);

		this.offset = (this.playground.width - 2*this.sideSpace - this.columns*BLOCK_WIDTH)/2; 


		//dovrà cambiare in base al livello
		for(var i = 0; i < this.rows; i++){
			this.configuration[i] = [];
			for(var j = 0; j < this.columns; j++){
				this.configuration[i][j] = new Brick(BLOCK_WIDTH, BRICK_HEIGHT, 1);
				var y = this.playground.offsetTop + this.topSpace + i*BRICK_HEIGHT;
				var x = this.playground.offsetLeft + this.sideSpace + this.offset + j*BLOCK_WIDTH ; 
				this.configuration[i][j].coordInit(x,y);
			}
		}
	} 

Ground.prototype.checkHit = 
	function(ball){

		var yLimit = this.configuration[this.rows-1][0].point.y; //quota limite per quando colpisce il lato lungo superiore 

		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.columns; j++){

				if(this.configuration[i][j].life > 0){

					if(this.configuration[i][j].hit(ball, yLimit)){	
						this.configuration[i][j].life--;
						
						if(this.configuration[i][j].life == 0){
							this.removeBrick(i, j);
							this.count--;
						}
					}
				}
			}
		}
	}


Ground.prototype.removeBrick = 
	function(i,j){

		var index = i*this.columns + j;
		var brickToRemove = document.getElementById('brick' + index);

		if(brickToRemove == null){
			console.log("errore");
			return;
		}

		brickToRemove.parentNode.removeChild(brickToRemove);
}