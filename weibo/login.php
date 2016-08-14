<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/14
 * Time: 11:07
 */

require_once "config.php";


$mysqli=new db_control();
$mysqli->connect();

$sql="SELECT `user`,`pass` FROM `weibo_user` WHERE `user`='{$_POST['user']}' LIMIT 1";
$query=$mysqli->query($sql);
if($rows=$query->fetch_array(MYSQLI_ASSOC)){
    if($rows['pass']==sha1(trim($_POST["pass"]))){
        sleep(1);
        echo 0;     //成功
    }else{
        sleep(1);
        echo 1;     //失败
    }
}
$mysqli->close();