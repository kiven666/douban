<?php
    // 历史上的今天调用示例代码 － 聚合数据
    // 在线接口文档：http://www.juhe.cn/docs/63

    header('Content-type:text/html;charset=utf-8');

    //配置您申请的appkey
    $appkey = "*********************";
     
    //************1.事件列表************
    $url = "http://api.juheapi.com/japi/toh";
    $month = $_GET['month'];
    $day = $_GET['day'];
    $params = array(
          "key" => $appkey,//应用APPKEY(应用详细页查询)
          "v" => 1.0,//版本，当前：1.0
          "month" => $month,//月份，如：10
          "day" => $day,//日，如：1
    );
    
    $paramstring = http_build_query($params);
    $content = juhecurl($url,$paramstring);
    $result = json_decode($content,true);
    if($result){
        if($result['error_code']=='0'){
            print_r($result);
        }else{
            echo $result['error_code'].":".$result['reason'];
        }
    }else{
        echo "请求失败";
    }
?>
