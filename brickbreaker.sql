-- Progettazione Web 
DROP DATABASE if exists brickbreaker; 
CREATE DATABASE brickbreaker; 
USE brickbreaker; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: brickbreaker
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `partitegiocate`
--

DROP TABLE IF EXISTS `partitegiocate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partitegiocate` (
  `idPartita` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `punteggio` varchar(45) NOT NULL,
  `dataPartita` date NOT NULL,
  PRIMARY KEY (`idPartita`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partitegiocate`
--

LOCK TABLES `partitegiocate` WRITE;
/*!40000 ALTER TABLE `partitegiocate` DISABLE KEYS */;
INSERT INTO `partitegiocate` VALUES (1,'prova','10','2020-01-29'),(2,'nicco','6','2020-01-29'),(3,'nicco','15','2020-01-29'),(4,'nicco','18','2020-01-29'),(5,'nicco','21','2020-01-29'),(6,'nicco','12','2020-01-29'),(7,'nicco','42','2020-01-29'),(8,'nicco','48','2020-01-29'),(9,'nicco','9','2020-01-29'),(10,'nicco','54','2020-01-29'),(11,'niccox','9','2020-01-29'),(12,'niccox','0','2020-01-29'),(13,'niccox','6','2020-01-29'),(14,'niccox','12','2020-01-29'),(15,'albe','36','2020-01-30'),(16,'ale','36','2020-01-30'),(17,'ale','45','2020-01-30'),(18,'alex','42','2020-01-30'),(19,'niccox','21','2020-01-30'),(20,'prova','45','2020-01-30'),(21,'nicco','75','2020-01-30'),(22,'nicco','135','2020-01-30'),(23,'niccox','30','2020-01-30'),(24,'nicco','78','2020-01-30'),(25,'prova','9','2020-01-30'),(26,'prova','396','2020-01-30'),(27,'prova','210','2020-01-31'),(28,'prova','0','2020-01-31'),(29,'prova','33','2020-01-31'),(30,'prova','48','2020-01-31'),(31,'prova','48','2020-01-31'),(32,'studenti','30','2020-01-31'),(33,'lucy','9','2020-01-31'),(34,'mamma','12','2020-01-31'),(35,'matte','27','2020-01-31'),(36,'pweb','237','2020-01-31');
/*!40000 ALTER TABLE `partitegiocate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `idUtente` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `record` int(10) unsigned NOT NULL DEFAULT '0',
  `dataPrimoLogin` date NOT NULL,
  `Image` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUtente`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'nicco','nicco@hotmail.it','nicco',135,'0000-00-00',1),(4,'niccox','niccogazza@hotmail.it','niccox',30,'2020-01-28',0),(5,'albe','albe@pweb.it','albe',36,'2020-01-30',0),(6,'ale','ale@pweb.it','ale',45,'2020-01-30',0),(7,'prova','nuovaprova@pweb.it','prova',396,'2020-01-30',1),(8,'prova2','prova@pweb.it','prova2',0,'2020-01-30',0),(9,'studenti','studenti@unipi.it','studenti',30,'2020-01-30',0),(10,'alex','alex@pweb.it','alex',42,'2020-01-30',0),(11,'mamma','mamma@mamma.it','mamma',12,'2020-01-31',0),(12,'matte','matte@pweb.it','matte',27,'2020-01-31',0),(13,'lucy','lucy@home.it','lucy',9,'2020-01-31',0);
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-01 18:19:46
