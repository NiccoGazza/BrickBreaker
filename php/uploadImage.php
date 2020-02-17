
<?php
	//setta l'attributo Image a 1 
	require_once './dbManager.php';

	if(!isset($_SESSION))
		session_start();

	$upload_dir = './../uploads/';
	$file_dir = $upload_dir.hash('sha256', $_SESSION['idUtente']);

	if(isset($_POST['submit'])) {
		move_uploaded_file($_FILES['fileToUpload']['tmp_name'] , $file_dir);

		updateDB();

		header('Location: ./hub.php?id='.$_SESSION['idUtente']);
		
		exit;
	}


	function updateDB(){

	global $brickBreakerDb;
	global $_SESSION;

	$query = "update utenti
			  set Image=1 
			  where username ='". $_SESSION['username'] ."';";

	$brickBreakerDb->performQuery($query);

	$brickBreakerDb->closeConnection();
}

?>