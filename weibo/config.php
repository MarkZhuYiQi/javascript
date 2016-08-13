<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/13
 * Time: 20:22
 */

    header("Content-type:text/html;charset=utf-8");
    define("DB_HOST","localhost");
    define("DB_USER","root");
    define("DB_PASS","7777777y");
    define("DB_NAME","weibo");
    define("DB_CHARSET","utf-8");


    class db_control{
        public $mysqli;
        function err($error){
            die("sorry!your operation meets something wrong!problem:".$error);
        }
        function connect(){
            $this->mysqli=new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);
            if($this->mysqli->connect_errno){
                $this->err("connect error!".$this->mysqli->connect_errno);
            }
            $this->mysqli->set_charset(DB_CHARSET);
        }
        function query($sql){
            if(!$query=$this->mysqli->query($sql)){
                $this->err($sql."<br />".$this->mysqli->error);
            }else{
                return $query;
            }
        }
        function close(){
            mysqli_close($this->mysqli);
        }
    }