<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/7/31
 * Time: 22:07
 */
//date_default_timezone_set("Asia/Shanghai");
//echo Date("Y-m-d H:i:s");

//print_r($_GET);

//if($_GET["name"]=="Mark"){
//    print_r("朱逸琦");
//}


//if($_POST["name"]=="Lee"){
//    $_POST["name"]="朱逸琦";
//}
//print_r($_POST);


require_once "config.php";


$mysqli=new db_control();
$mysqli->connect();
$sql="INSERT INTO `weibo_blog` (`title`,`content`,`date`) 
        VALUES('{$_POST['title']}','{$_POST['content']}',NOW())";
$mysqli->query($sql);

//sleep(1);   //延迟3秒钟
echo $mysqli->mysqli->affected_rows;

$mysqli->close();


