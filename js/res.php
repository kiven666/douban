<?php
    $url = $_GET['url'];
    $callback = $_GET['callback'];
    $ret = file_get_contents($url); 
    echo $callback."(".json_encode($ret).")";
?>