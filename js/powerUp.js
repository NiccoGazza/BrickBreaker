//File che gestisce i powerUp, ovvero la loro creazione, grafica, movimento e scomparsa

var magnetActive = false;
var powerUpClock;
var magnetTimer;
var powerUps = new Array();   //mi serve sapere quale powerUp eliminare quando cade o quale potenziamento attivare



function generatePowerUp(ground, i, j, paddle, game){//parametri i,j: servono per l'eventuale creazione

 	var param = Math.floor(Math.random()*101) //genera numero casuale da 0 a 100

 	if(between(param, 0, 10)){   //life   (p = 9/101)
 		createPowerUp(ground, i, j, 1, paddle, game);
 		return;
 	}

 	if(between(param, 10, 30)){ //magnet  (p = 20/101)
 		createPowerUp(ground, i, j, 2, paddle, game);
 		return;
 	}

 	if(between(param, 30, 45)){	//long_paddle  (p = 15/101)
 		createPowerUp(ground, i, j, 3, paddle, game);
 		return;
 	}

 	if(between(param, 45, 55)){ //malus			(p = 9/101)
 		createPowerUp(ground, i, j, 4, paddle, game);
 		return;
 	}

 	return;
}


function createPowerUp(ground, i, j, index, paddle, game){
	var playground = document.getElementById('playground');
	if(playground == null)
		return;

	var powerUp = document.createElement('div');
	powerUp.setAttribute('class', 'powerup');
	powerUp.setAttribute('id', 'powerup' + powerUps.length);

	var path = "url(./../img/powerups/powerup" + index + ".ico)";

	powerUp.style.backgroundImage =  path;

	playground.appendChild(powerUp);


	var y = ground.configuration[i][j].point.y + BLOCK_HEIGHT/2 - POWERUP_DIM/2;
	var x = ground.configuration[i][j].point.x + BLOCK_WIDTH/2 - POWERUP_DIM/2;

	var elem = new Point(x, y);
	elem.id = powerUps.length;
	elem.type = index;

	powerUps.push(elem);  

	powerUp.style.top = y + 'px';
	powerUp.style.left = x + 'px';

	if(powerUps.length == 1)
		powerUpClock = setInterval(function(){
										movePowerUps(ground, paddle, game);
									}, 20);
	
	return;
}

function movePowerUps(ground, paddle, game){  
	
	for(var i = powerUps.length-1; i >= 0; i--){
		powerUps[i].y += POWERUP_STEP;

		if(powerUps[i].y + POWERUP_DIM >= ground.playground.offsetTop + ground.playground.height){ 
			removePowerUps(powerUps[i].id)
			powerUps.splice(i, 1); 
		}

		else if(powerUps[i].y + POWERUP_DIM >= paddle.point.y && 
			between(powerUps[i].x, paddle.point.x, paddle.point.x + paddle.width) ){
			removePowerUps(powerUps[i].id);
			givePower(powerUps[i].type, paddle, game);
			powerUps.splice(i, 1);
		}

		else
			drawPowerUps(i, powerUps[i].id);
	}

	if(powerUps.length == 0)
		clearInterval(powerUpClock);
}


function drawPowerUps(i, id){
	var temp = document.getElementById('powerup' + id);

	if(temp == null){
		console.log("errore draw");
		return;
	}
	
	temp.style.top = powerUps[i].y + 'px';
	temp.style.left = powerUps[i].x + 'px';


}


function removePowerUps(i){
	var temp = document.getElementById('powerup' + i);
	
	if(temp == null){
		console.log('errore rimozione powerup');
		return;
	}

	temp.parentNode.removeChild(temp);

}



function givePower(type, paddle, game){


	switch(type){


		case 1: 
			if(LIVES < HEARTS){
				var id = HEARTS - 1 - LIVES;
				var heart = document.getElementById('heart' + id);
				if(heart != null)
					heart.style.opacity = 1;
				LIVES++;
			}
			else game.sketcher.updateScore();  //se lo raccolgo e ho le vite al max. => punti bonus
			break; 


		case 2:
			if(magnetActive == false && game.ground.count != 0)
				magnetTimer = setInterval(function(){
												magnetActive = true;
												activateMagnetCheck(game);
									  	  }, 20);
			break;


		case 3:                   
			if(paddle.width == LONG_PADDLE_WIDTH)
				break;
			else{                     
				var originalWidth = BLOCK_WIDTH;
				paddle.width = LONG_PADDLE_WIDTH;
				timer = new Timer(function(){
									paddle.width = originalWidth;
								  }, 5000)

				break;
			}


		case 4:
			if(paddle.width == SHORT_PADDLE_WIDTH)
				break;
			else{
				var originalWidth = BLOCK_WIDTH;
				paddle.width = SHORT_PADDLE_WIDTH;
				timer = new Timer(function(){
									paddle.width = originalWidth;
								   }, 5000)
			}

		default: 
			break;
	}

}


function activateMagnetCheck(game){   //mi serve per 'catturare' la palla

	//bug: se ho preso un magnete, e prendo la pallina di "super" striscio => l'if restituisce true, ma anche ball.checkBottomHit();
	if( (game.ball.point.y + 2*game.ball.radius >= game.paddle.point.y) &&
		(between(game.ball.point.x + game.ball.radius, game.paddle.point.x, game.paddle.point.x + game.paddle.width)) ){
		console.log("preso");
		stopBall(game);
	}

	else if(game.ball.point.y + 2*game.ball.radius >= game.paddle.point.y + game.paddle.height){
		clearInterval(magnetTimer);
		magnetActive = false;
	}

}


function stopBall(game){
	//nel caso in cui prenda la pallina di striscio: devo aggiustare la y
	game.ball.point.y = game.paddle.point.y - 2*game.ball.radius;

	clearInterval(magnetTimer);
	clearInterval(game.ballTimer);

	/**********************************************/
	game.sketcher.drawBall(game.ball);

	game.ballStopped = setInterval('game.followThePaddle()', 20);
	game.ball.stepX = 0;
	game.ball.stepY = -Math.sqrt(2*BALL_STEP*BALL_STEP);
	game.begin = true;

}


