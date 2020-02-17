var NEXT_LEVEL_ID = 'next_level';
var NEXT_LEVEL_TEXT = 'Well Done! Click to continue.'
var GAME_OVER_ID = 'game_over';
var GAME_OVER_TEXT = 'You Losed!';
var GAME_OVER_TEXT_RECORD = 'You Losed...But is Personal Record!!';

function createPopup(ground){
	var popup = document.getElementById(NEXT_LEVEL_ID);

	if(popup != null)
		return;

	var text = document.createElement('p');
	text.appendChild(document.createTextNode(NEXT_LEVEL_TEXT));

	popup = document.createElement('div');		
	popup.setAttribute('id', NEXT_LEVEL_ID);
	popup.setAttribute('class', 'popup Arcade');
	popup.appendChild(text);
	
	var nextLevelButton = document.createElement('button');
	nextLevelButton.setAttribute('class', 'next_level Arcade');
	nextLevelButton.appendChild(document.createTextNode('Next Level'));

	nextLevelButton.onclick = function(){
								ground.nextLevel();
							}  

	document.body.appendChild(popup);
	popup.appendChild(nextLevelButton);

}


function removePopup(){
	var popup = document.getElementById(NEXT_LEVEL_ID);

	if(popup == null)
		return;

	popup.parentNode.removeChild(popup);

}

function createGameOverPopup(flag){   // TO DO: Aggiungere complimenti se fa nuovo record
	var gameover = document.getElementById(GAME_OVER_ID);

	if(gameover != null)
		return;

	var text = document.createElement('p');
	console.log(flag);
	
	if(flag == false)
		text.appendChild(document.createTextNode(GAME_OVER_TEXT));
	else text.appendChild(document.createTextNode(GAME_OVER_TEXT_RECORD));

	gameover = document.createElement('div');		
	gameover.setAttribute('id', GAME_OVER_ID);
	gameover.setAttribute('class', 'popup Arcade');
	gameover.appendChild(text);	 

	document.body.appendChild(gameover);

	var anchor = document.createElement('a');
	anchor.appendChild(document.createTextNode('Play Again!'));
	anchor.setAttribute('href', './../php/game.php');
	anchor.setAttribute('class', 'ext');
	gameover.appendChild(anchor);
	
}