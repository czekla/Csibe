<?php

//$token = $_REQUEST["token"];
$request_data = json_decode(file_get_contents("php://input"));
$token = $request_data->token;

require './auth.php';

//var_dump($token);

$payload = Auth::validate($token);

if ($payload) {
    header('Content-type: application/json');
    http_response_code(200);
    $response_array['token'] = Auth::createToken($payload);
    echo json_encode($response_array);
//Auth::$messages[200];
} else {
    http_response_code(401);
}
