<?php
	require "./dbConfig.php";
	$brickBreakerDb = new brickBreakerDbManager();

	class brickBreakerDbManager{
		private $mysqli_conn = null;

		function brickBreakerDbManager(){
			$this->openConnection();
		}

		function openConnection(){
			if(!$this->isOpened()){
				global $dbHostname;
				global $dbUsername;
				global $dbPassword;
				global $dbName;

				//apro connessione
				$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);

				if($this->mysqli_conn->connect_error)
					die('Connect error (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);


				$this->mysqli_conn->select_db($dbName) or
					die('Can\'t use pweb: ' . mysqli_error());	
			}


		}


		function isOpened(){ //ritorna true se la connessione è aperta
			return ($this->mysqli_conn != null);

		}

		function performQuery($queryText){ //esegue la query passata come arg. e restituisce il risultato della query
			if(!$this->isOpened())
				$this->openConnection();

			return $this->mysqli_conn->query($queryText);
		}

		function sqlInjectionFilter($param){
			if(!$this->isOpened())
				$this->openConnection();

			return $this->mysqli_conn->real_escape_string($param);

		}


		function closeConnection(){ 
			if($this->mysqli_conn != null)
				$this->mysqli_conn->close();

			$this->mysqli_conn = null;
		}

	}

?>