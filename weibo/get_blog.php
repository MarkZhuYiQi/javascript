<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/13
 * Time: 22:40
 */
require_once "config.php";


$mysqli=new db_control();
$mysqli->connect();

$sql="SELECT `title`,`content`,`date` FROM `weibo_blog`ORDER BY `date` DESC LIMIT 0,3";
$query=$mysqli->query($sql);
$json="";
while(!!$rows=$query->fetch_array(MYSQLI_ASSOC)){
    $json.=json_encode($rows).',';
}
//sleep(1);
echo '['.mb_substr($json,0,-1,'utf-8').']';
$mysqli->close();