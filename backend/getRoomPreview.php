<?php
$data = json_decode(file_get_contents("php://input"));
$roomid = $data->roomid;
//$roomid = $_POST["roomid"];
if ($roomid == 1) {
    ?>
    {
    "roomDetails": {
    "uisref" : "roomview" ,
    "largesrc" : "./images/1.jpg",
    "title" : "Azuki bean",
    "description" : "Swiss chard pumpkin bunya nuts maize plantain aubergine napa cabbage soko coriander sweet pepper water spinach winter purslane shallot tigernut lentil beetroot."
    }
    }
    <?php
}
if ($roomid == 2) {
    ?>
    {
    "roomDetails": {
    "uisref" : "roomview" ,
    "largesrc" : "./images/2.jpg",
    "title" : "Veggies sunt bona vobis",
    "description" : "Komatsuna prairie turnip wattle seed artichoke mustard horseradish taro rutabaga ricebean carrot black-eyed pea turnip greens beetroot yarrow watercress kombu."
    }
    }
    <?php
}
if ($roomid == 3) {
    ?>
    {
    "roomDetails": {
    "uisref" : "roomview" ,
    "largesrc" : "./images/3.jpg",
    "title" : "Dandelion horseradish",
    "description" : "Cabbage bamboo shoot broccoli rabe chickpea chard sea lettuce lettuce ricebean artichoke earthnut pea aubergine okra brussels sprout avocado tomato."
    }
    }
    <?php
}

