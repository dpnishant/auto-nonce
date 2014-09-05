<?php
$token_name = "_csrf";
if(session_status() === PHP_SESSION_NONE) {
	session_start();
	$salt = '$2$y$n0nc3';
	$_SESSION['username'] = session_id();
	$token = substr(hash('md5', $_SESSION['username'].$salt), 4, 8);
	$response = array('token_name' => $token_name, 'token_value' => $token);
	header('Content-Type: application/json');
	echo json_encode($response);
}
?>
