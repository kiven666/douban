<?php 
    $id = $_GET['id'];
    $callback = $_GET['callback'];
    $url = 'https://api.douban.com/v2/movie/subject/'.$id;
    $ret = file_get_contents($url); 
    echo $callback."(".json_encode($ret).")";
 ?>