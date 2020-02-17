<?php
	session_start();
	require_once './dbManager.php';
	$username = $_SESSION['username'];
?>


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<link href="https://fonts.googleapis.com/css?family=Courier+Prime&display=swap" rel="stylesheet">
		<link rel="icon" type="image/x-icon" href="./../img/game.ico">
		<title>Brick Breaker: Global Ranking</title>
		<link rel="stylesheet" type="text/css" href="../css/hub.css">
	</head>
	<body>
		<div id="welcome">
			<?php
				echo '<h1 class="Courier_Prime"> Hello ' . $username . '! </h1>';
				echo '<h2 class="Courier_Prime"> This is the Global Ranking. Hope you\'re in! </h2>';
			?>
			
			<ul>
				<li><a class="zoom" href="./hub.php">Home Page</a></li>
				<li><a class="zoom2" href="./game.php">Brick Breaker</a></li>
				<li><a class="zoom" href="./logout.php">Logout</a></li>
			</ul>
		</div>
		<div id="classifica" class="Courier_Prime">
			<h1>GLOBAL RANKING</h1>
			<table>
				<thead> 
					<tr>
						<th>Player</th> <th>Score</th> <th>Game-Date</th>
					</tr>
				</thead>
				<tbody>
				<?php
					global $brickBreakerDb;
					$query = 'select U.username, U.record, PG.dataPartita
							  from brickbreaker.utenti U inner join brickbreaker.partitegiocate PG on U.username = PG.username
							  where U.record = PG.punteggio
							  order by U.record desc
							  limit 10;';
					$res = $brickBreakerDb->performQuery($query);
					$numRows = mysqli_num_rows($res);
					if($numRows > 0){
						while($record = mysqli_fetch_array($res)){
							echo "<tr>";
								echo "<td>". $record['username'] . "</td>";
								echo "<td>" . $record['record'] . "</td>";
								echo "<td>" . $record['dataPartita'] . "</td>";
							echo "</tr>";
						}
					}
				?>
				</tbody>
			</table>
		</div>
	</body>
</html>