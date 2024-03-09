CREATE DATABASE  IF NOT EXISTS `centur` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `centur`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: centur
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_logo` blob DEFAULT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_address` longtext NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (2,_binary '1709078388.png','New Era General Hospital','Luzon Ave., Commwealth, Diliman Quezon City','Hospital',1,'2024-02-24 05:00:54','2024-02-27 15:59:48'),(3,_binary '1709078121.png','Camarin Doctors Hospital','Camarin, Caloocan City, Metro Manila','Hospital',1,'2024-02-27 15:55:21','2024-02-27 15:55:21'),(4,_binary '1709079161.png','Mother Seton Hospital','Naga City','Hospital',1,'2024-02-27 16:12:41','2024-02-27 16:12:41'),(5,_binary '1709083884.png','Alabang Medical Clinic','Alabang, Muntinlupa City','Clinic',1,'2024-02-27 17:31:24','2024-02-27 17:31:24');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `contact_no` double NOT NULL,
  `tel_no` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company_address` longtext NOT NULL,
  `enabled` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contacts_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,9652845007,'(024) 908 323','bertnet08@gmail.com','Blk 34 Lot 7 Rancho Imperial Subd. Kinale, Polangui Albay',1,'2024-02-24 04:22:13','2024-02-24 04:30:27');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `headers`
--

DROP TABLE IF EXISTS `headers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `headers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `header_title` mediumtext NOT NULL,
  `header_body` longtext NOT NULL,
  `enabled` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `headers`
--

LOCK TABLES `headers` WRITE;
/*!40000 ALTER TABLE `headers` DISABLE KEYS */;
INSERT INTO `headers` VALUES (1,'Centur Healthcare Trading Corp','Welcome to Centur Healthcare Trading Corp - Your Trusted Partner in Healthcare Solutions! Explore our comprehensive range of high-quality medical supplies and equipment designed to meet the evolving needs of healthcare professionals. With a commitment to excellence and innovation, we strive to enhance patient care and optimize clinical outcomes. Partner with us for reliable products and exceptional service. Let us shape the future of healthcare together!',1,'2024-02-24 03:49:14','2024-02-25 04:20:43');
/*!40000 ALTER TABLE `headers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(6,'2019_12_14_000001_create_personal_access_tokens_table',2),(11,'2024_02_24_082922_create_missions_table',3),(12,'2024_02_24_083009_create_visions_table',3),(13,'2024_02_24_113657_create_headers_table',4),(16,'2024_02_24_115524_create_contacts_table',5),(17,'2024_02_24_124725_create_clients_table',6),(18,'2024_02_24_130649_create_products_table',7);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `missions`
--

DROP TABLE IF EXISTS `missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `missions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mission` longtext NOT NULL,
  `enabled` tinyint(4) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (3,'At Centur Healthcare Trading Corp, our mission is to provide exceptional healthcare solutions by offering a diverse range of high-quality medical supplies and equipment. We are dedicated to meeting the evolving needs of healthcare professionals and institutions with innovative products and reliable service. Our commitment to excellence drives us to enhance patient care and contribute positively to the healthcare community.',1,'2024-02-24 01:58:47','2024-02-25 04:51:19');
/*!40000 ALTER TABLE `missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_image` blob NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_model` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_manufacturer` varchar(255) NOT NULL,
  `product_specimen_type` varchar(255) DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,_binary '1708989293.jpg','Sysmex XN550','XN550','Analyzer for CBC','Sysmex','Whole Blood',1,'2024-02-24 18:18:35','2024-02-26 15:14:53'),(4,_binary '1708989395.jpg','iChroma III','III','iChroma III','Biomerioux','Serum',1,'2024-02-26 12:05:32','2024-02-26 15:16:35'),(5,_binary '1708980271.png','BioLIS 30i','30i','Biolis for chem','Biomeriux','dsa',1,'2024-02-26 12:44:31','2024-02-26 12:44:31'),(6,_binary '1709038738.jpg','Biorod D10','D10','sample only','Bio-Rad',NULL,1,'2024-02-27 04:58:58','2024-02-27 04:58:58'),(7,_binary '1709038771.png','Lifotronic H9','Lifotronic H9','Lifotronic H9','Lifotronic',NULL,1,'2024-02-27 04:59:31','2024-02-27 04:59:31'),(8,_binary '1709038793.jpg','Sphera','Sphera Edif','sample only','Edif',NULL,1,'2024-02-27 04:59:53','2024-02-27 04:59:53'),(9,_binary '1709038815.jpg','Mini Vidas','Mini Vidas','Mini Vidas','Biomeriux',NULL,1,'2024-02-27 05:00:15','2024-02-27 05:00:15'),(10,_binary '1709047388.jpg','B Auto 200','Auto 200','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur rem reprehenderit quaerat debitis vel, quod quidem autem fugit, suscipit quas, doloremque fugiat. Rem aliquid, nisi nihil culpa earum totam alias.','Becman Coulter',NULL,1,'2024-02-27 05:00:59','2024-02-27 07:23:08'),(11,_binary '1709038880.jpg','Finecare','Finecare','Finecare','Finecare',NULL,1,'2024-02-27 05:01:20','2024-02-27 05:01:20'),(12,_binary '1709038896.jpg','EasyLyte','EasyLyte','EasyLyte','EasyLyte',NULL,0,'2024-02-27 05:01:36','2024-02-27 05:01:36');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Albert Serrano Garcia','bertnet08@gmail.com',NULL,'$2y$10$rJq2l0lChQqoAJLtcKRjZeLINliclYUEWyFhwEWhAihQDjaxWvP2i','LBTIK6c5twMjv0fkwWIkEaGa3DAtTWFtyYB1uSsBLRjJOPPlLtu5kx9Utdls','2024-02-23 23:23:41','2024-02-24 02:11:58');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visions`
--

DROP TABLE IF EXISTS `visions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `vision` longtext NOT NULL,
  `enabled` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visions`
--

LOCK TABLES `visions` WRITE;
/*!40000 ALTER TABLE `visions` DISABLE KEYS */;
INSERT INTO `visions` VALUES (2,'Our vision at Centur Healthcare Trading Corp is to be a trusted leader in the healthcare industry, known for our unwavering commitment to quality, integrity, and customer satisfaction. We aspire to continuously innovate and expand our product offerings to address emerging healthcare challenges and improve patient outcomes. Through strategic partnerships and a relentless pursuit of excellence, we aim to shape the future of healthcare delivery and make a meaningful difference in the lives of patients and providers alike.',1,'2024-02-24 02:10:42','2024-02-25 04:51:39');
/*!40000 ALTER TABLE `visions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-29 17:56:33
