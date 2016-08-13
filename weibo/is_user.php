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

$sql="SELECT `user` FROM `weibo_user` WHERE `user`='{$_POST['user']}' LIMIT 1";
$query=$mysqli->query($sql);
if($query->fetch_array(MYSQLI_ASSOC)){
    sleep(2);
    echo 1;
}
$mysqli->close();