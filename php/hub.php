<?php
	require_once './dbManager.php';
	require_once './getPic.php';
	session_start();

	$idUtente = $_SESSION['idUtente'];
	$username = $_SESSION['username'];
	$email = $_SESSION['email'];
	$record = $_SESSION['record'];
	$dataIscrizione = $_SESSION['dataPrimoLogin'];
?>


<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Brick Breaker</title>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css?family=Courier+Prime&display=swap" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../css/hub.css">
		<link rel="icon" href="../img/game.ico" type="image/x-icon">
	</head>
	<body>
		<div id="welcome">
			<?php
				echo '<h1 class="Courier_Prime"> Hello ' . $username . '! </h1>';
				echo '<h2 class="Courier_Prime"> This is your Home Page. Enjoy! </h2>';
			?>

			<div class="profile_pic">
				<?php echo getPic($_SESSION['idUtente']); ?>
			</div>

			<ul>
				<li><a class="zoom" href="./classifica.php">Global Ranking</a></li>
				<li><a class="zoom2" href="./game.php">Brick Breaker</a></li>
				<li><a class="zoom" href="./logout.php">Logout</a></li>
			</ul>
		</div>
		<div class="Courier_Prime" id="statistics">
			<b>STATISTICS & PERSONAL INFORMATION</b>
			<hr>
			<?php
				echo '<p>Your username is: ' . $username .' </p>';
				echo '<p>Your email is: ' . $email .' </p>';
				echo '<p>Your personal high-score is: ' . $record . ' </p>';
				echo '<p>The first time you logged-in was: '. $dataIscrizione . ' </p>';
			?>
			<a class="modify" href="./changeProfile.php"><button class="prof_button">Change your profile</button></a>
			<a class="modify"><button class="prof_button" id="pic_button" onclick="showForm()">Change Profile Photo</button></a>

			<form id="profile_picture_form" class="hidden" action="uploadImage.php" method="POST" enctype="multipart/form-data">
				<input type="file" name="fileToUpload" required> 
				<input type="submit" name="submit" value="Send">
			</form>

			<script>
				function showForm(){
					var form = document.getElementById('profile_picture_form');

					if(form.getAttribute('class') == 'hidden'){
						form.setAttribute('class', '');
						form.style.position = 'absolute';
						form.style.left = '50%';		
					}
					else 
						form.setAttribute('class', 'hidden');
				}
			</script>

	</body>
</html>