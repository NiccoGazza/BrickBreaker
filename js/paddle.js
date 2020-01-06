function Paddle(playground, width, height, step){
	var x = playground.offsetLeft + playground.width/2 - BLOCK_WIDTH/2;  
	var y = playground.offsetTop + playground.height - BLOCK_HEIGHT;
	this.point = new Point(x,y);
	this.width = width;
	this.height = height;
	this.step = step;
}


Paddle.prototype.move = 
	function(flag){
		this.point.x += flag*this.step; 
	}