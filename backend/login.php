<?php

$email = $_REQUEST["email"];
$password = $_REQUEST["password"];

require './auth.php';

header('Content-type: application/json');
http_response_code(200);
$userdata = array("user"=>"qbi");
$response_array['token'] = Auth::createToken($userdata);
echo json_encode($response_array);
