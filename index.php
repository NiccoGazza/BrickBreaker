
<?php
	session_start();

	function isLogged(){
		if(isset($_SESSION['userId']))
			return $_SESSION['userId'];
		else
			return false;
	}

	if(isLogged()){
		header('Location: ./php/main.php');	
		exit;
	}
?>



<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Brick breaker</title>
		<link rel="icon" href="./img/game.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" href="./css/index.css">
		<link href="https://fonts.googleapis.com/css?family=Courier+Prime&display=swap" rel="stylesheet">
		<meta charset="utf-8">
		<meta name="author" content="Niccolò Gazzanelli">
		<meta name="description" content="Brick Breaker Game">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<script>
	function openInfoTab(){
		window.open("./istruzioni.html", "_blank");
	}
	function openRegistrationPage(){
		window.open("./php/registration.php", "_self");
	}
	</script>
	<body>
		<button title="Click to know how to play" onclick="openInfoTab()">
		</button>
		<section id="login_content">
			<div id="login_header_content" class="Courier_Prime">
				<br>
				Brick Breaker:<br>
				Login to play
			</div>
			<div id="registration_alert" class="Courier_Prime">
				If you are a new user, click on "Registration"
			</div>
			<br>
			<form name = "login" action="./php/login.php" method="post">
				<input class="Courier_Prime" type="text" placeholder="Username" name="username" required> <br>
				<br>
				<input class="Courier_Prime" type="password" placeholder="Password" name="password" required>
				<br>
			<div id="login_button">
				<input class="Courier_Prime" type="submit" value="Login">   
				<input class="Courier_Prime" type="button" value="Registration" onclick ="openRegistrationPage()">
				<?php 
					if(isset($_GET['errorMessage'])){
						echo '<div class = "login_error Courier_Prime">';
						echo '<span>' . $_GET['errorMessage'] . '</span>';
						echo '</div>';
					}
				?>
			</div> 
			</form>
		</section>
	</body>
</html>