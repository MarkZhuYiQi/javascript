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
$birthday=$_POST["year"]."-".$_POST["month"]."-".$_POST["day"];

$sql="INSERT INTO `weibo_user` (`user`,`pass`,`ques`,`ans`,`email`,`birthday`,`ps`) 
        VALUES('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['ques']}','{$_POST['ans']}',
        '{$_POST['email']}','{$birthday}','{$_POST['ps']}')";

$mysqli->query($sql);

sleep(3);   //延迟3秒钟
echo $mysqli->mysqli->affected_rows;

$mysqli->close();


