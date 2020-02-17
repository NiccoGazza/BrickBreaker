<?php
	require_once"./dbManager.php";
	
	//prelevo input dal form
	$username = $_POST['username'];
	$email = $_POST['email'];
	$password1 = $_POST['password1'];
	$password2 = $_POST['password2'];

	$error_message = signup($username, $email, $password1, $password2);

	if($error_message === null)
		header('Location: ./hub.php');
	else 
		header('Location: ./registration.php?errorMessage=' . $error_message );

	function signup($username, $useremail, $password1, $password2){
		if($username != null && $useremail != null && $password1 != null && $password2 != null){

			if($password1 != $password2)
				return 'Entered different passwords!';

			$_SESSION['dataPrimoLogin'] = date("Y-m-d"); //salvo la data attuale per salvarla nel DB
			$userId = insert_into_db($username, $password1, $useremail);

			if($userId > 0){
				session_start();
				
				//setto le variabili di sessione
				$_SESSION['username'] = $username;
				$_SESSION['email'] = $useremail;
				$_SESSION['dataPrimoLogin'] = date("Y-m-d"); 
				$_SESSION['record'] = 0; 
				$_SESSION['password'] = $password1; 

				return null;
			}	
			else if($userId == -1) //username già esistente
				return 'Username already used! Please choose antoher one.';
			else
				return ' Registration failed ' . $userId ;	
		}
		else 
			return 'Some fields are empty!';  //I campi sono required => non si dovrebbe mai verificare

	}

	function insert_into_db($username, $password, $useremail){
		global $brickBreakerDb;
		//pulisco dati in input
		$username = $brickBreakerDb->sqlInjectionFilter($username);
		$password = $brickBreakerDb->sqlInjectionFilter($password);

		//verifico che l'username non esista
		$query = "select * 
				  from utenti 
				  where username = '" . $username ."' ";

		$res = $brickBreakerDb->performQuery($query);

		$numRow = mysqli_num_rows($res);

		if($numRow > 0)
			return -1; //gestito da signup

		else{ //posso inserire nel database
			$insert_query = "insert into utenti(username, email, password, dataPrimoLogin)  
							 values('" . $username . "', '" . $useremail . "', '" . $password . "', '" . $_SESSION['dataPrimoLogin'] . "')";

			$res = $brickBreakerDb->performQuery($insert_query);

			if(!$res)
				return -2;
		}
		//ritorno l'id dell'utente inserito
		$res = $brickBreakerDb->performQuery($query);
		$userRow = $res->fetch_assoc();
		$brickBreakerDb->closeConnection();

		return $userRow['idUtente'];
	}



?>