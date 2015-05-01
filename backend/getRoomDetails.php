<?php

$data = json_decode(file_get_contents("php://input"));
$roomid = $data->roomid;

include './roomdata.json';
    