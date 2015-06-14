<?php
$request_data = json_decode(file_get_contents("php://input"));
$roomid = $request_data->roomid;
if ($roomid == 1) {
    include './previewdata1.json';
}
if ($roomid == 2) {
    include './previewdata2.json';
}
if ($roomid == 3) {
    include './previewdata3.json';
}

