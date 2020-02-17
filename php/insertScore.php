<?php
	session_start();
	require_once './dbManager.php';

	if(isset($_POST['punteggio']) && isset($_SESSION['username'])){
		global $brickBreakerDb;
		$score = $_POST['punteggio'];
		$username = $_SESSION['username'];

		$query = "insert into partitegiocate(username, punteggio, dataPartita)
				  values('".$username."', '".$score."', CURRENT_DATE)";
				  
		$res = $brickBreakerDb->performQuery($query);
		
		//controllo se è nuovo record
		$query = "select record
		  		  from utenti
		  		  where username = '". $username ."'";

		$res = $brickBreakerDb->performQuery($query);
		$row = $res->fetch_assoc();

		$record = $row['record'];

		//se il punteggio della partita appena finita è maggiore: aggiorno il database
		if($score > $record){
				$query = "update utenti 
					  set record='" . $score ."'
					  where username = '". $username ."';
					  ";
			$res = $brickBreakerDb->performQuery($query);
			echo "Record";
			$_SESSION['record'] = $score;
		}
		else echo "NoRecord";

		$brickBreakerDb->closeConnection();

	}

?>
