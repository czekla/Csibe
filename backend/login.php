<?php

$request_data = json_decode(file_get_contents("php://input"));
$email = $request_data->email;
$password = $request_data->password;

require './auth.php';

header('Content-type: application/json');

if ($email == "a@a" && $password == "aa") {
    http_response_code(200);
    $userdata = array("user" => "qbi");
    $response_array['token'] = Auth::createToken($userdata);
    echo json_encode($response_array);
} else {
    http_response_code(403);
}

