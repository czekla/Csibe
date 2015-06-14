<?php

$request_data = json_decode(file_get_contents("php://input"));
$roomid = $request_data->roomid;

include './roomdata.json';
    