-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 23, 2019 at 11:17 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clickphoto`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE IF NOT EXISTS `comentario` (
  `id_comentario` int(8) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(200) CHARACTER SET latin1 NOT NULL,
  `id_user` int(8) NOT NULL,
  `id_publicacao` int(8) NOT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `usercoment_fk` (`id_user`),
  KEY `publicoment_fk` (`id_publicacao`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comentario`
--

INSERT INTO `comentario` (`id_comentario`, `comentario`, `id_user`, `id_publicacao`) VALUES
(47, 'Fraco, fraquinho', 30, 19),
(50, 'gfdgfdgfd', 30, 18),
(51, 'llll', 30, 18),
(52, 'nbnbnb', 30, 19),
(53, 'dddd', 30, 18);

-- --------------------------------------------------------

--
-- Table structure for table `gosto`
--

DROP TABLE IF EXISTS `gosto`;
CREATE TABLE IF NOT EXISTS `gosto` (
  `id_gosto` int(8) NOT NULL AUTO_INCREMENT,
  `data` varchar(60) CHARACTER SET latin1 NOT NULL,
  `id_publicacao` int(8) NOT NULL,
  `id_user` int(8) NOT NULL,
  PRIMARY KEY (`id_gosto`),
  KEY `usergosto_fk` (`id_user`),
  KEY `publicacaogosto_fk` (`id_publicacao`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gosto`
--

INSERT INTO `gosto` (`id_gosto`, `data`, `id_publicacao`, `id_user`) VALUES
(114, '2019-07-23T16:08:00.812Z', 18, 30),
(115, '2019-07-23T16:08:02.412Z', 19, 30);

-- --------------------------------------------------------

--
-- Table structure for table `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
CREATE TABLE IF NOT EXISTS `publicacao` (
  `id_publicacao` int(8) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(300) CHARACTER SET latin1 NOT NULL,
  `foto` varchar(90) CHARACTER SET latin1 NOT NULL,
  `data` varchar(60) CHARACTER SET latin1 NOT NULL,
  `localizacao` varchar(80) CHARACTER SET latin1 DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `id_user` int(8) NOT NULL,
  PRIMARY KEY (`id_publicacao`),
  KEY `user_fk` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publicacao`
--

INSERT INTO `publicacao` (`id_publicacao`, `descricao`, `foto`, `data`, `localizacao`, `estado`, `id_user`) VALUES
(18, 'imagemteste', '0lmor9s98o5r.png', '12-12-2019', 'FB HQ', 1, 31),
(19, 'joaozinho felixinho', 'bggri4uszxs.png', '12-12-2018', 'Luz', 1, 31),
(22, 'aaaaa', 'ldrs7zkh42i.png', '2019-7-23 23:42:30', NULL, 1, 30);

-- --------------------------------------------------------

--
-- Table structure for table `seguir`
--

DROP TABLE IF EXISTS `seguir`;
CREATE TABLE IF NOT EXISTS `seguir` (
  `id_seguir` int(8) NOT NULL AUTO_INCREMENT,
  `id_seguidor` int(8) NOT NULL,
  `id_seguido` int(8) NOT NULL,
  PRIMARY KEY (`id_seguir`),
  KEY `seguidor_fk` (`id_seguidor`),
  KEY `seguido_fk` (`id_seguido`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seguir`
--

INSERT INTO `seguir` (`id_seguir`, `id_seguidor`, `id_seguido`) VALUES
(37, 30, 31),
(39, 35, 30);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(8) NOT NULL AUTO_INCREMENT,
  `e-mail` varchar(50) CHARACTER SET latin1 NOT NULL,
  `password` varchar(200) CHARACTER SET latin1 NOT NULL,
  `hash` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `data_nascimento` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `data_registo` varchar(50) CHARACTER SET latin1 NOT NULL,
  `nome` varchar(50) CHARACTER SET latin1 NOT NULL,
  `foto` varchar(70) CHARACTER SET latin1 DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `e-mail`, `password`, `hash`, `data_nascimento`, `ativo`, `data_registo`, `nome`, `foto`, `username`) VALUES
(30, 'a@a.com', '80b412b35c8f2315b3c71ce8c92882ea4d2932d1', 'ydg9v467ek', '12-12-1990', 1, '2019-7-12 15:41:32', 'Paulo Mendes', 'ydg9v467ek.png', 'pamendes'),
(31, 'a@a.com', '0f41f82c82b72295ff902fc660de9a904cd11315', '7289n98y5mg', '12-12-1990', 1, '2019-7-12 19:05:43', 'Xico Santos', '7289n98y5mg.png', 'xico'),
(35, 'pamendes2@gmail.com', '9936e3d101ecde5e43c4c44209195ed75af0d070', 'ee2ss4kf2mi', 'null', 1, '2019-7-23 16:56:07', 'pamendes2', 'null', 'pamendes2');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `publicoment_fk` FOREIGN KEY (`id_publicacao`) REFERENCES `publicacao` (`id_publicacao`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usercoment_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gosto`
--
ALTER TABLE `gosto`
  ADD CONSTRAINT `publicacaogosto_fk` FOREIGN KEY (`id_publicacao`) REFERENCES `publicacao` (`id_publicacao`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usergosto_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `publicacao`
--
ALTER TABLE `publicacao`
  ADD CONSTRAINT `user_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seguir`
--
ALTER TABLE `seguir`
  ADD CONSTRAINT `seguido_fk` FOREIGN KEY (`id_seguido`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seguidor_fk` FOREIGN KEY (`id_seguidor`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
