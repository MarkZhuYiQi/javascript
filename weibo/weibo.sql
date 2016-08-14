-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2016 at 03:20 PM
-- Server version: 5.6.17
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
-- Table structure for table `weibo_blog`
--

CREATE TABLE IF NOT EXISTS `weibo_blog` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `weibo_blog`
--

INSERT INTO `weibo_blog` (`id`, `title`, `content`, `date`) VALUES
(5, '最新微博', '我也要去当经纪人！', '2016-08-14 14:55:01'),
(7, '来条最新的！', '来条最新的！', '2016-08-14 18:20:47'),
(11, '我们的爱', 'fir', '2016-08-14 20:49:12'),
(13, '月牙湾', '月牙湾', '2016-08-14 21:00:36'),
(17, '123213', '123123213', '2016-08-14 21:12:51');

-- --------------------------------------------------------

--
-- Table structure for table `weibo_user`
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
-- Dumping data for table `weibo_user`
--

INSERT INTO `weibo_user` (`id`, `user`, `pass`, `ques`, `ans`, `email`, `birthday`, `ps`) VALUES
(13, 'red', 'ca581782dd06e7199ac414994744d633ed8fedef', '1', 'red', 'red@qq.com', '1951-01-03', 'red');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
