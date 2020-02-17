<?php

	session_start();

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
			<h1 class="Courier_Prime">Modify your Profile</h1>
			<hr>
			<form class="Courier_Prime" name="registration" action="./changeInfo.php" method="post">
				<p>Please Confirm your Password:
				<br>
				<input type="password" name="password" required>
			</p>
			<p>Insert new e-mail:
				<br>
				<input type="email" name="new_email">
			</p>
			<p>Insert new password:
				<br>
				<input type="password" name="new_password1">
			</p>
			<p>Confirm your new password:
				<br>
				<input type="password" name="new_password2">
			</p>
			<button type="submit" class="Courier_Prime">Change</button>
			<hr>
			<p id="signup">Go Back to <br><a href="./hub.php"> Home Page</a></p>
			<?php
				if(isset($_GET['message'])){
					echo '<div id="error" class = "Courier_Prime">';
					echo '<span>' . $_GET['message'] . '</span>';
					echo '</div>';
				}
			?>  
			</form>
		</div>
	</body>
</html>

