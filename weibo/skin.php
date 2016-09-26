<?php
/**
 * Created by PhpStorm.
 * User: SZL4ZSY
 * Date: 8/15/2016
 * Time: 2:56 PM
 */
require_once "config.php";


$mysqli=new db_control();
$mysqli->connect();

if($_POST["type"]=="get"){
    $sql="SELECT `small_bg`,`big_bg`,`bg_color`,`bg_text`,`bg_flag` FROM `weibo_skin`";
    $query=$mysqli->query($sql);
    $json="";
    while(!!$rows=$query->fetch_array(MYSQLI_ASSOC)){
        $json.=json_encode($rows).",";
    }
    sleep(1);
    echo '['.mb_substr($json,0,-1,"utf-8")."]";
}else if($_POST["type"]=="default") {
    $sql = "SELECT `big_bg`,`bg_color`,`bg_flag` FROM `weibo_skin` WHERE `bg_flag`=1 LIMIT 1";
    $query = $mysqli->query($sql);
    echo "[" . json_encode($query->fetch_array(MYSQLI_ASSOC)) . "]";
}else if($_POST["type"]=="set"){
    $sql1 = "UPDATE `weibo_skin` SET `bg_flag`=0 WHERE `bg_flag`=1";
    $sql2 = "UPDATE `weibo_skin` SET `bg_flag`=1 WHERE `big_bg`='{$_POST['big_bg']}'";
    $mysqli->query($sql1);
    $query=$mysqli->query($sql2);
    echo $mysqli->mysqli->affected_rows;
}else{
    echo $_POST["type"];
}


$mysqli->close();
