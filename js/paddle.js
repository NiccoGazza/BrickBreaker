function Paddle(playground, width, height, step){
	var x = playground.offsetLeft + playground.width/2 - BLOCK_WIDTH/2;  
	var y = playground.offsetTop + playground.height - BLOCK_HEIGHT;
	this.point = new Point(x,y);
	this.width = width;
	this.height = height;
	this.step = step;
	this.flag = 0;
}


Paddle.prototype.move = 
	function(flag){
		this.flag = flag;
		this.point.x += flag*this.step; 
	}


Paddle.prototype.resetPosition = 
	function(playground){

		this.point.x = playground.offsetLeft + playground.width/2 - this.width/2;  
		this.point.y = playground.offsetTop + playground.height - BLOCK_HEIGHT;

		return;
	}