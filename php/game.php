<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Brick Breaker</title>
		<link rel="icon" type="image/x-icon" href="../img/game.ico">
		<link rel="stylesheet" type="text/css" href="../css/game.css">
		<script src="../js/ground.js"></script>
		<script src="../js/game.js"></script>
		<script src="../js/ball.js"></script>
		<script src="../js/playground.js"></script>
		<script src="../js/util.js"></script>
		<script src="../js/sketcher.js"></script>
		<script src="../js/paddle.js"></script>
		<script src="../js/brick.js"></script>
		<script src="../js/popup.js"></script>
		<script src="../js/powerUp.js"></script>
	</head>
	<body onload="begin()">
		<div id="playgroundWrapper">
			<?php
				session_start();
			?>
			<aside id = "menu" class="Arcade">
				<ul>
					<a href="./hub.php"><li>Home Page</li></a>
					<a href="./classifica.php"><li>Global Ranking</li></a>
					<a href="./logout.php"><li>Logout</li></a>
				</ul>	
			</aside>	
			<div id="divControl" class="Arcade">
				<div id="score">Score : <span>0</span></div>
				<div id="lives"></div>
			</div>
			<div id="divButton">
				<button type="button" id="resumeButton" class="Arcade">RESUME</button> 
				<button type="button" id="pauseButton" class="Arcade">PAUSE</button>
			</div>
			<div id="playground">
			</div>
		</div>
	</body>
</html>