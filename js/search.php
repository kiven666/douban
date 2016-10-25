<?php 
    $num = $_GET['num'];
    $callback = $_GET['callback'];
    $url = 'https://api.douban.com/v2/movie/search?q='.$num;
    $ret = file_get_contents($url); 
    echo $callback."(".json_encode($ret).")";
 ?>
