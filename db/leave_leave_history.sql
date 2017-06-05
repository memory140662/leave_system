CREATE DATABASE  IF NOT EXISTS `leave` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `leave`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: leave
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `leave_history`
--

DROP TABLE IF EXISTS `leave_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leave_history` (
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `hours` int(11) NOT NULL DEFAULT '0',
  `date_fr` datetime NOT NULL,
  `date_to` datetime NOT NULL,
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `his_allow` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`_id`),
  KEY `f_user_id_idx` (`user_id`),
  KEY `f_type_id_idx` (`type_id`),
  CONSTRAINT `f_type_id` FOREIGN KEY (`type_id`) REFERENCES `leave_type` (`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `f_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_history`
--

LOCK TABLES `leave_history` WRITE;
/*!40000 ALTER TABLE `leave_history` DISABLE KEYS */;
INSERT INTO `leave_history` VALUES (11,1,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',1,'N'),(11,1,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',2,'N'),(11,2,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',3,'N'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',4,'N'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',5,'N'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',6,'N'),(11,4,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',7,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',8,'Y'),(11,6,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',9,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',10,'Y'),(11,7,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',11,'Y'),(11,6,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',12,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',13,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',14,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',15,'Y'),(11,5,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',16,'Y'),(11,4,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',17,'Y'),(11,3,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',18,'Y'),(11,6,8,'2017-05-28 00:00:00','2017-05-28 00:00:00',19,'Y'),(11,3,8,'2017-05-29 00:00:00','2017-05-29 00:00:00',20,'Y'),(11,5,8,'2017-05-29 00:00:00','2017-05-29 00:00:00',21,'Y'),(11,7,8,'2017-05-29 00:00:00','2017-05-29 00:00:00',22,'Y'),(12,3,8,'2017-05-29 00:00:00','2017-05-29 00:00:00',23,'Y');
/*!40000 ALTER TABLE `leave_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-30 12:32:48