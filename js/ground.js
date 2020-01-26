function Ground(playground, sketcher){
	this.playground = playground;
	this.sketcher = sketcher;
	this.topSpace = 20; //piccolo spazio in alto
	this.sideSpace = 10; //piccolo spazio ai lati

	this.rows = ROWS;
	this.columns = Math.trunc( (this.playground.width - 2*this.sideSpace) / BLOCK_WIDTH);
	//this.columns = 1;

	this.count = 0; //Quanti mattoncini da distruggere ci sono

	this.offset = 0;

	this.configuration = [];
	//this.level = level; //all'inizio è 0

	this.createBricks();
}



Ground.prototype.createBricks = 
	function(level){	//cambierò configurazione in base al livello. 
		
		this.offset = (this.playground.width - 2*this.sideSpace - this.columns*BLOCK_WIDTH)/2; 


		//dovrà cambiare in base al livello
		for(var i = 0; i < this.rows; i++){
			this.configuration[i] = [];
			for(var j = 0; j < this.columns; j++){
				this.configuration[i][j] = new Brick(BLOCK_WIDTH, BRICK_HEIGHT);
				var y = this.playground.offsetTop + this.topSpace + i*BRICK_HEIGHT;
				var x = this.playground.offsetLeft + this.sideSpace + this.offset + j*BLOCK_WIDTH ; 
				this.configuration[i][j].coordInit(x,y);

				this.configuration[i][j].life = Math.floor(Math.random()*4) + 1;

				if(this.configuration[i][j].life != 4)
					this.count++;
			}
		}
	} 

Ground.prototype.checkHit = 
	function(game, ball, paddle){

		var yLimit = this.configuration[this.rows-1][0].point.y + this.configuration[this.rows-1][0].height; //quota limite per quando colpisce il lato lungo superiore 

		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.columns; j++){

				if(this.configuration[i][j].life > 0){

					if(this.configuration[i][j].hit(ball, yLimit)){	

						if(this.configuration[i][j].life != 4){
							this.configuration[i][j].life--;
							this.sketcher.changeColor(this, i, j);
							this.sketcher.updateScore(); 
							generatePowerUp(this, i, j, paddle, game);
						}

						if(this.configuration[i][j].life == 0){
							this.removeBrick(i, j);
							this.count--;
							if(this.count == 0){
								clearInterval(magnetTimer);  
								this.createPopup(game, this);
							}								
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


Ground.prototype.createPopup = 
	function(game, ground){
		game.resumeButton.disabled = true;
		game.pauseButton.disabled = true;

		clearInterval(game.ballTimer);
		clearInterval(game.paddleTimer);
		
		createPopup(ground);
	}

Ground.prototype.nextLevel = 
	function(){
		game.resetPosition();
		removePopup();
		this.count = 0;  //resetto count
		this.createBricks(++level);
		this.sketcher.drawBricks(this);
		return;
	}