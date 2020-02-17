<?php
	require_once "./dbManager.php";

	//prelevo i dati dal form
	$username = $_POST['username'];
	$password = $_POST['password'];

	$errorMessage = login($username, $password);

	if($errorMessage === null)
		header('Location: ./hub.php');
	else  //index mostrerà l'errore
		header('Location: ./../index.php?errorMessage=' . $errorMessage );
	


	function login($username, $password){
		if($username != null && $password != null){
			$res = authenticate($username, $password);
			if($res != -1){
				session_start();

				//setto le variabili di sessione
				$_SESSION['idUtente'] = $res['idUtente'];
				$_SESSION['username'] = $res['username'];
				$_SESSION['email'] = $res['email'];
				$_SESSION['dataPrimoLogin'] = $res['dataPrimoLogin'];
				$_SESSION['record'] = $res['record'];

				return null;
			}
			else return 'Username and Password not valid! Try again or sign up.';

		}
		else
			return 'Please insert username and password';

	}

	function authenticate($username, $password){
		global $brickBreakerDb;

		//"pulisco" dati in input
		$username = $brickBreakerDb->sqlInjectionFilter($username); 
		$password = $brickBreakerDb->sqlInjectionFilter($password);

		$query = "select *
				  from utenti
				  where username = '" . $username . " ' AND password ='" . $password . "'";

		$res = $brickBreakerDb->performQuery($query);

		$numRow = mysqli_num_rows($res);
		
		if($numRow != 1)
			return -1;

		$userRow = $res->fetch_assoc();
		$brickBreakerDb->closeConnection();

		$res = array('idUtente'=> $userRow['idUtente'],
					 'username' => $userRow['username'],
					 'dataPrimoLogin' => $userRow['dataPrimoLogin'],
					 'email'=> $userRow['email'],
					 'record'=> $userRow['record']
					);

		return $res;
	}

























?>