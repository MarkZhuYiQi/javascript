-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-08-15 16:38:57
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `weibo`
--

-- --------------------------------------------------------

--
-- 表的结构 `weibo_blog`
--

CREATE TABLE IF NOT EXISTS `weibo_blog` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `weibo_blog`
--

INSERT INTO `weibo_blog` (`id`, `title`, `content`, `date`) VALUES
(5, '最新微博', '我也要去当经纪人！', '2016-08-14 14:55:01'),
(7, '来条最新的！', '来条最新的！', '2016-08-14 18:20:47'),
(11, '我们的爱', 'fir', '2016-08-14 20:49:12'),
(13, '月牙湾', '月牙湾', '2016-08-14 21:00:36'),
(17, '123213', '123123213', '2016-08-14 21:12:51');

-- --------------------------------------------------------

--
-- 表的结构 `weibo_skin`
--

CREATE TABLE IF NOT EXISTS `weibo_skin` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `small_bg` varchar(200) NOT NULL,
  `big_bg` varchar(200) NOT NULL,
  `bg_color` varchar(200) NOT NULL,
  `bg_text` varchar(200) NOT NULL,
  `bg_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `weibo_skin`
--

INSERT INTO `weibo_skin` (`id`, `small_bg`, `big_bg`, `bg_color`, `bg_text`, `bg_flag`) VALUES
(1, 'small_bg1.png', 'bg1.jpg', '#E7E9E8', '皮肤1', 0),
(2, 'small_bg2.png', 'bg2.jpg', '#ECF0FC', '皮肤2', 1),
(3, 'small_bg3.png', 'bg3.jpg', '#E2E2E2', '皮肤3', 0),
(4, 'small_bg4.png', 'bg4.jpg', '#FFFFFF', '皮肤4', 0),
(5, 'small_bg5.png', 'bg5.jpg', '#F3F3F3', '皮肤5', 0),
(6, 'small_bg6.png', 'bg6.jpg', '#EBDEBE', '皮肤6', 0);

-- --------------------------------------------------------

--
-- 表的结构 `weibo_user`
--

CREATE TABLE IF NOT EXISTS `weibo_user` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `pass` char(40) NOT NULL,
  `ques` varchar(200) NOT NULL,
  `ans` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `ps` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `weibo_user`
--

INSERT INTO `weibo_user` (`id`, `user`, `pass`, `ques`, `ans`, `email`, `birthday`, `ps`) VALUES
(13, 'red', 'ca581782dd06e7199ac414994744d633ed8fedef', '1', 'red', 'red@qq.com', '1951-01-03', 'red');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
