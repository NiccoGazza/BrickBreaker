<?php

	// Resituisce il tag img con l'immagine impostata (in base all'id dell'utente)
	function getPic($id) {

		$default_pic = '<img src="./../img/default.jpeg" class="pic">';

		if ($id == null) {
			return $default_pic;
		}

		$type = idToPic($id);

		//se la query non restituisce niente
		if($type == null ) {
			return $default_pic;
		}

		$type = $type->fetch_assoc();

		//se l'attributo è settato a 0
		if (!$type['Image']) {
			return $default_pic;
		}

		// L'immagine del profilo si trova nella cartella uploads
		// Il nome del file è l'hash dell'id dell'utente
		return '<img src="../uploads/'.hash('sha256', $id).'" class="pic">';
	}


	//Interroga il DB per sapere se l'utente ha scelto un'immagine
	function idToPic($id) {
		global $brickBreakerDb;

		$id = $brickBreakerDb->sqlInjectionFilter($id);

		$query = "select Image 
				  from utenti
				  where idUtente = '" . $id . "' ; ";

		$res = $brickBreakerDb->performQuery($query);

		$brickBreakerDb->closeConnection();

		if($res==null || $res->num_rows == 0)
			return null;

		return $res;
	}

?>