<?php
	session_start();

	function isLogged(){
		if(isset($_SESSION['userId']))
			return $_SESSION['userId'];
		else
			return false;
	}

	if(isLogged()){
		header('Location: ./hub.php');
		exit;
	}
?> 

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Brick Breaker</title>
		<link rel="icon" href="../img/game.ico" type="image/x-icon">
		<link href="https://fonts.googleapis.com/css?family=Courier+Prime&display=swap" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../css/login.css">
		<meta charset="utf-8">
		<meta name="author" content="Niccolò Gazzanelli">
		<meta name="description" content="Brick Breaker Login">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
		<div id ="registration_content">
			<h1 class="Courier_Prime">SIGN UP TO PLAY!</h1>
			<hr>
			<form class="Courier_Prime" name="registration" action="./sign-up.php" method="post">
				<p>Insert user name:
				<br>
				<input type="text" name="username" required>
			</p>
			<p>Insert e-mail:
				<br>
				<input type="email" name="email" required>
			</p>
			<p>Insert password:
				<br>
				<input type="password" name="password1" required></p>
			<p>Confirm password:
				<br>
				<input type="password" name="password2" required>
			</p>
			<button type="submit" class="Courier_Prime">Sign up</button>
			<hr>
			<p id="signup">..Or Go Back to <a href="../index.php"> LOGIN</a></p>
			<?php
				if(isset($_GET['errorMessage'])){
					echo '<div class = "signup_error Courier_Prime">';
					echo '<span>' . $_GET['errorMessage'] . '</span>';
					echo '</div>';
				}
			?>  
			</form>
		</div>
	</body>
</html>


