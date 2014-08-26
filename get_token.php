<?php
$token_name = "_csrf";
if(session_status() === PHP_SESSION_NONE) {
	session_start();
	$_SESSION['username'] = session_id();
	$token = substr(hash('md5', $_SESSION['username'].'$2$y$n0nc3'), 4, 8);
	$response = array('token_name' => $token_name, 'token_value' => $token);
	header('Content-Type: application/json');
	echo json_encode($response);
}
?>
