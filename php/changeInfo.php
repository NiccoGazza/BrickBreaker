<?php
	session_start();
	require_once './dbManager.php';

	$password = $_POST['password'];
	$new_email = $_POST['new_email'];
	$new_password1 = $_POST['new_password1'];
	$new_password2 = $_POST['new_password2'];

	$message = changePass($username, $password, $new_password1, $new_password2, $new_email);
	header('Location: ./changeProfile.php?message=' . $message);
	

	function changePass($username, $password, $new_password1, $new_password2, $new_email){

		if(isset($_SESSION['username'])){
			global $brickBreakerDb; 

			$username = $_SESSION['username'];

			if($password != null){

				$password = $brickBreakerDb->sqlInjectionFilter($password);

				//verifico che sia la password dell'utente
				$query = "select *
						  from utenti 
						  where username = '" . $username . "'; ";

				$res = $brickBreakerDb->performQuery($query);

				$row = $res->fetch_assoc();

				if($password == $row['password']){

					if($new_password1 != null || $new_password2 != null){

						if($new_password1 != $new_password2)
							return 'New passwords don\'t match!';
						else{
							$query = "update utenti
									  set password = '" . $new_password1 . "'
									  where username = '" . $username . "'; ";

							$res = $brickBreakerDb->performQuery($query);
							$message1 = 'Password updated';
						}
					}

					if($new_email != null){
						$query = "update utenti
								  set email = '" . $new_email . "'
								  where username = '" . $username . "'; ";

						$res = $brickBreakerDb->performQuery($query);
						$_SESSION['email'] = $new_email;
						$message1 = $message1 . ' E-mail updated';
					}

					return $message1;
				}
				else return 'Wrong Password!';
			}
		}
	}

?>
