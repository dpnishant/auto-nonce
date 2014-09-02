<?php
session_start();
$headers = getallheaders();
$server_token = substr(hash('md5', $_SESSION['username'].'$2$y$n0nc3'), 4, 8);
$incoming_token = array($headers['X-CSRF-Token'],$_POST['_csrf'],$_GET['_csrf']);
$client_token = null;
// Validation routine
if (!empty($_COOKIE['PHPSESSID'])) {

	if ($_COOKIE['PHPSESSID'] === $_SESSION['username']) {
		@$client_token = $incoming_token[array_search($server_token,$incoming_token)];
		if ($client_token === $server_token)) {
			echo print_response($_SERVER['REQUEST_METHOD']);
		}
		else {
			echo print_error($_SERVER['REQUEST_METHOD']);
		}
	} else {
		$response = array('error' => 'true', 'error_msg' => 'not logged in');
		echo json_encode($response);
	}

} else {
	$response = array('error' => 'true', 'error_msg' => 'not logged in');
	echo json_encode($response);
}

// Function to return a JSON reponse if validation is successful.
function print_response ($method) {
	if ($method === 'GET') {
		$name = htmlentities(isset($_GET['name'])) ? htmlentities((string)$_GET['name']) : "default_name";
		$msg = htmlentities(isset($_GET['msg'])) ? htmlentities((string)$_GET['msg']) : "default_message";
		$response = array('greet' => 'Hello, '.$name, 'msg' => $msg);
		header('Content-Type: application/json');
		return json_encode($response);
	} elseif ($method === 'POST') {
		$name = htmlentities(isset($_POST['name'])) ? htmlentities((string)$_POST['name']) : "default_name";
		$msg = htmlentities(isset($_POST['msg'])) ? htmlentities((string)$_POST['msg']) : "default_message";
		$response = array('greet' => 'Hello, '.$name, 'msg' => $msg);
		header('Content-Type: application/json');
		return json_encode($response);
	}
}

// Function to return a JSON error if validation is unsuccessful.
function print_error ($method) {
	global $server_token, $client_token;
	$headers = getallheaders();

	$error = array('error' => 'true',
		'error_msg' => 'Client Token: '.$client_token.
		'<br>Server Token: '.$server_token);
	header('Content-Type: application/json');
	return json_encode($error);
}
?>
