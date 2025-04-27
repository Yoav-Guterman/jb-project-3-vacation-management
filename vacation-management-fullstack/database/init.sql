-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 28, 2025 at 01:34 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_management`
--
CREATE DATABASE IF NOT EXISTS `vacation_management` DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

USE `vacation_management`;

-- --------------------------------------------------------
--
-- Table structure for table `follows`
--
CREATE TABLE
    `follows` (
        `user_id` char(36) CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `vacation_id` char(36) CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--
INSERT INTO
    `follows` (
        `user_id`,
        `vacation_id`,
        `created_at`,
        `updated_at`
    )
VALUES
    (
        '0d3378e8-41c8-43ce-bc4c-89a4ec5e47e3',
        'e1f2a3b4-c5d6-4a78-e9f0-a1b2c3d4e5f6',
        '2025-03-27 08:25:07',
        '2025-03-27 08:25:07'
    ),
    (
        'a4b72e8f-2b9c-4d1e-a5f7-8e9b3c1d7a6b',
        'b2c3d4e5-f6a7-4809-b0c1-d2e3f4a5b6c7',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'a4b72e8f-2b9c-4d1e-a5f7-8e9b3c1d7a6b',
        'e1f2a3b4-c5d6-4a78-e9f0-a1b2c3d4e5f6',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'a4b72e8f-2b9c-4d1e-a5f7-8e9b3c1d7a6b',
        'f6a7b8c9-d0e1-4a23-f4a5-b6c7d8e9f0a1',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'a4b72e8f-2b9c-4d1e-a5f7-8e9b3c1d7a6b',
        'a1b2c3d4-e5f6-4a78-b9c0-d1e2f3a4b5c6',
        '2025-03-28 13:46:00',
        '2025-03-28 13:46:00'
    ),
    (
        'b5c83f91-3c0d-4e2f-b6a8-9f0d4e2c1b3a',
        'b2c3d4e5-f6a7-4809-b0c1-d2e3f4a5b6c7',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'b5c83f91-3c0d-4e2f-b6a8-9f0d4e2c1b3a',
        'f6a7b8c9-d0e1-4a23-f4a5-b6c7d8e9f0a1',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'b5c83f91-3c0d-4e2f-b6a8-9f0d4e2c1b3a',
        'b9c8d7e6-f5a4-4b32-c1d0-e9f8a7b6c5d4',
        '2025-03-28 13:47:00',
        '2025-03-28 13:47:00'
    ),
    (
        'd7e05a12-5e2f-4a4b-d8c0-1b2f6a4e3d5c',
        'b9c8d7e6-f5a4-4b32-c1d0-e9f8a7b6c5d4',
        '2025-03-28 13:48:00',
        '2025-03-28 13:48:00'
    ),
    (
        'e8f16b23-6f3a-485c-e9d1-2c3a7b5f4e6d',
        'b9c8d7e6-f5a4-4b32-c1d0-e9f8a7b6c5d4',
        '2025-03-28 13:49:00',
        '2025-03-28 13:49:00'
    ),
    (
        'c016829d-a157-4602-a018-c5bd3d3fa8e6',
        '5c3128ce-d64e-418a-859c-439e29b4c02d',
        '2025-03-27 09:43:56',
        '2025-03-27 09:43:56'
    ),
    (
        'c016829d-a157-4602-a018-c5bd3d3fa8e6',
        'c9d0e1f2-a3b4-4a56-c7d8-e9f0a1b2c3d4',
        '2025-03-28 12:46:33',
        '2025-03-28 12:46:33'
    ),
    (
        'c016829d-a157-4602-a018-c5bd3d3fa8e6',
        'e1f2a3b4-c5d6-4a78-e9f0-a1b2c3d4e5f6',
        '2025-03-27 08:24:53',
        '2025-03-27 08:24:53'
    ),
    (
        'c016829d-a157-4602-a018-c5bd3d3fa8e6',
        'a1b2c3d4-e5f6-4a78-b9c0-d1e2f3a4b5c6',
        '2025-03-28 13:45:00',
        '2025-03-28 13:45:00'
    ),
    (
        'c6d94f01-4d1e-4f3a-c7b9-0a1e5f3d2c4b',
        'b2c3d4e5-f6a7-4809-b0c1-d2e3f4a5b6c7',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c6d94f01-4d1e-4f3a-c7b9-0a1e5f3d2c4b',
        'd7c6b5a4-e3f2-4d19-87f7-16a5b4c3d2e1',
        '2025-03-28 13:50:00',
        '2025-03-28 13:50:00'
    ),
    (
        'c6d94f01-4d1e-4f3a-c7b9-0a1e5f3d2c4b',
        'c9d0e1f2-a3b4-4a56-c7d8-e9f0a1b2c3d4',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c6d94f01-4d1e-4f3a-c7b9-0a1e5f3d2c4b',
        'd4e5f6a7-b8c9-4a01-d2e3-f4a5b6c7d8e9',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'd7e05a12-5e2f-4a4b-d8c0-1b2f6a4e3d5c',
        'b8c9d0e1-f2a3-4a45-b6c7-d8e9f0a1b2c3',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'd7e05a12-5e2f-4a4b-d8c0-1b2f6a4e3d5c',
        'd4e5f6a7-b8c9-4a01-d2e3-f4a5b6c7d8e9',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'e8f16b23-6f3a-485c-e9d1-2c3a7b5f4e6d',
        'f2a3b4c5-d6e7-4a89-f0a1-b2c3d4e5f6a7',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    );

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE
    `users` (
        `id` char(36) CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
            `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
            `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
            `password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
            `role` enum ('user', 'admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
INSERT INTO
    `users` (
        `id`,
        `first_name`,
        `last_name`,
        `email`,
        `password`,
        `role`,
        `created_at`,
        `updated_at`
    )
VALUES
    (
        '0d3378e8-41c8-43ce-bc4c-89a4ec5e47e3',
        'יואב',
        'גוטרמן',
        'yoavguterman1st@gmail.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-27 08:12:37',
        '2025-03-27 08:12:37'
    ),
    (
        '16743767-5b2e-40ca-bf27-2d2f06ec97d3',
        'aa',
        'aa',
        'aaa@gmail.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-19 12:55:44',
        '2025-03-19 12:55:44'
    ),
    (
        '5dbda961-4c34-45e8-a6f5-6a661307e5d5',
        'yoav',
        'guterman',
        'a@as1.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-19 13:08:39',
        '2025-03-19 13:08:39'
    ),
    (
        '8940887e-413a-400f-bb45-088d4d896fc0',
        'liron',
        'guterman',
        'lguterman@gmail.com',
        '4dd033c89803abc5d940e14556dffae740565218270c3287e8e6bfb6dfda5e41',
        'user',
        '2025-03-22 14:27:00',
        '2025-03-22 14:27:00'
    ),
    (
        'a4b72e8f-2b9c-4d1e-a5f7-8e9b3c1d7a6b',
        'John',
        'Smith',
        'john.smith@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'b5c83f91-3c0d-4e2f-b6a8-9f0d4e2c1b3a',
        'Jane',
        'Doe',
        'jane.doe@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c016829d-a157-4602-a018-c5bd3d3fa8e6',
        'yoav',
        'guterman',
        'yoavguterman@gmail.com',
        'd1b505f5228e233c20a0edd4b0b6bb2a9f668dfc5bc40023bfe6f4048ebfdd59',
        'user',
        '2025-03-17 12:25:19',
        '2025-03-17 12:25:19'
    ),
    (
        'c6d94f01-4d1e-4f3a-c7b9-0a1e5f3d2c4b',
        'Michael',
        'Johnson',
        'michael.johnson@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c6e3dbae-cd6a-4bcb-8eab-cf99e0038d9d',
        'asd',
        'asd',
        'a@a.ca',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-19 12:58:40',
        '2025-03-19 12:58:40'
    ),
    (
        'd482872b-9000-42a5-9fc5-ac6812509bec',
        'yoav',
        'guterman',
        'yoavguterman@gmail.co',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-19 13:09:42',
        '2025-03-19 13:09:42'
    ),
    (
        'd7e05a12-5e2f-4a4b-d8c0-1b2f6a4e3d5c',
        'Emily',
        'Williams',
        'emily.williams@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'de97942f-cfd1-41df-9e3a-01c0485b3da3',
        'test',
        'test',
        'test@gmail.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-19 14:01:58',
        '2025-03-19 14:01:58'
    ),
    (
        'e8f16b23-6f3a-485c-e9d1-2c3a7b5f4e6d',
        'David',
        'Brown',
        'david.brown@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'f6f436d5-104f-4122-a34b-108b3685b447',
        'stav',
        'yeruham',
        'stavye11003@gmail.com',
        'a811b3eccd102b67286aee0a440f5fbd0383cf9bc3c2b90b2ec013301a8a1a94',
        'user',
        '2025-03-20 18:18:17',
        '2025-03-20 18:18:17'
    ),
    (
        'f9a27c34-7a4b-496d-f0e2-3d4b8c6a5f7e',
        'Admin',
        'User',
        'admin@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'admin',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'fb79417e-364b-432c-a5df-70e89dd07c1e',
        'ori',
        'yaniv',
        'oriyaniv@gmail.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-23 18:07:20',
        '2025-03-23 18:07:20'
    ),
    (
        'ffdfea74-8720-4300-afbc-f1717629e7cb',
        'cfir',
        'yeru',
        'cfir@gmail.com',
        'dfc72360fae6e2b2dfdd7a06d447ba4a5104be20b1329e8700752b962e29f04e',
        'user',
        '2025-03-21 19:09:09',
        '2025-03-21 19:09:09'
    );

-- --------------------------------------------------------
--
-- Table structure for table `vacations`
--
CREATE TABLE
    `vacations` (
        `id` char(36) CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `destination` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
            `description` text COLLATE utf8mb4_general_ci NOT NULL,
            `start_date` datetime NOT NULL,
            `end_date` datetime NOT NULL,
            `price` int NOT NULL,
            `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
            `created_at` datetime NOT NULL,
            `updated_at` datetime NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--
INSERT INTO
    `vacations` (
        `id`,
        `destination`,
        `description`,
        `start_date`,
        `end_date`,
        `price`,
        `image_url`,
        `created_at`,
        `updated_at`
    )
VALUES
    (
        '5c3128ce-d64e-418a-859c-439e29b4c02d',
        'Budapest, Hungary',
        'Discover the historic thermal baths, stunning architecture, and vibrant nightlife in one of Europes most charming capitals.',
        '2025-05-10 00:00:00',
        '2025-05-17 00:00:00',
        1199,
        'il.co.johnbryce.yoavguterman/budapest.webp',
        '2025-03-25 20:44:26',
        '2025-03-25 20:44:26'
    ),
    (
        'b2c3d4e5-f6a7-4809-b0c1-d2e3f4a5b6c7',
        'Santorini, Greece',
        'Discover the iconic white-washed buildings with blue domes overlooking the Aegean Sea. Enjoy spectacular sunsets, volcanic beaches, and traditional Greek cuisine in this romantic island paradise that captivates visitors from around the world.',
        '2025-06-10 00:00:00',
        '2025-06-20 00:00:00',
        1599,
        'il.co.johnbryce.yoavguterman/santorini.jpeg',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'b8c9d0e1-f2a3-4a45-b6c7-d8e9f0a1b2c3',
        'New York City, USA',
        'Discover the city that never sleeps with iconic landmarks like Times Square, Central Park, and the Statue of Liberty. Experience world-class museums, Broadway shows, diverse cuisine, and unparalleled shopping in this global metropolis.',
        '2025-12-01 00:00:00',
        '2025-12-08 00:00:00',
        1499,
        'il.co.johnbryce.yoavguterman/New-York-City.jpg',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c5d6e7f8-a9b0-4a12-c3d4-e5f6a7b8c9d0',
        'Tokyo, Japan',
        'Experience the perfect blend of ultramodern and traditional in Japan\s bustling capital. Visit ancient temples, explore futuristic districts like Shibuya and Shinjuku, enjoy world-class shopping, and savor authentic Japanese cuisine in this dynamic metropolis.',
        '2025-11-10 00:00:00',
        '2025-11-18 00:00:00',
        1999,
        'il.co.johnbryce.yoavguterman/tokyo.webp',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'c9d0e1f2-a3b4-4a56-c7d8-e9f0a1b2c3d4',
        'Venice, Italy',
        'Navigate the romantic canals aboard a traditional gondola and marvel at Renaissance architecture. Visit St. Mark\'s Square, Doge\'s Palace, and cross the Rialto Bridge while exploring this unique city built entirely on water.',
        '2025-05-20 00:00:00',
        '2025-05-28 00:00:00',
        1599,
        'il.co.johnbryce.yoavguterman/Venice.jpg',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'd4e5f6a7-b8c9-4a01-d2e3-f4a5b6c7d8e9',
        'Machu Picchu, Peru',
        'Trek to the ancient Incan citadel set high in the Andes Mountains. This UNESCO World Heritage site offers breathtaking views and a glimpse into pre-Columbian America with its sophisticated dry-stone architecture and astronomical alignments.',
        '2025-07-05 00:00:00',
        '2025-07-15 00:00:00',
        2199,
        'il.co.johnbryce.yoavguterman/machu-picchu.jpg',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'e1f2a3b4-c5d6-4a78-e9f0-a1b2c3d4e5f6',
        'Hadera, Israel',
        'Discover the historic thermal baths, stunning architecture, and vibrant nightlife in one of Europe\s most charming capitals.',
        '2025-05-10 00:00:00',
        '2025-05-17 00:00:00',
        1199,
        'il.co.johnbryce.yoavguterman/hadera.jpg',
        '2025-03-17 12:14:48',
        '2025-03-26 13:47:44'
    ),
    (
        'f2a3b4c5-d6e7-4a89-f0a1-b2c3d4e5f6a7',
        'Paris, France',
        'Experience the romance of the City of Light with iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy world-class cuisine, stroll along the Seine River, and explore charming neighborhoods in this cultural capital.',
        '2025-06-15 00:00:00',
        '2025-06-23 00:00:00',
        1399,
        'il.co.johnbryce.yoavguterman/paris.jpg',
        '2025-03-17 12:14:48',
        '2025-03-17 12:14:48'
    ),
    (
        'f6a7b8c9-d0e1-4a23-f4a5-b6c7d8e9f0a1',
        'Barcelona, Spain',
        'Explore Antoni Gaudí\s architectural masterpieces including Sagrada Familia and Park Güell. Wander through the Gothic Quarter, enjoy tapas at La Boqueria market, and relax on Mediterranean beaches in this vibrant Catalan city.',
        '2025-09-10 00:00:00',
        '2025-09-18 00:00:00',
        1199,
        'il.co.johnbryce.yoavguterman/Barcelona.jpg',
        '2025-03-17 12:14:48',
        '2025-03-21 19:27:04'
    ),
    (
        'a1b2c3d4-e5f6-4a78-b9c0-d1e2f3a4b5c6',
        'Kyoto, Japan',
        'Experience traditional Japan in its ancient capital. Visit historic temples and shrines, stroll through bamboo forests, and witness the beauty of cherry blossoms. Enjoy authentic tea ceremonies, traditional ryokan accommodations, and exquisite Japanese cuisine.',
        '2025-08-15 00:00:00',
        '2025-08-23 00:00:00',
        1799,
        'il.co.johnbryce.yoavguterman/kyoto.jpg',
        '2025-03-28 13:30:00',
        '2025-03-28 13:30:00'
    ),
    (
        'b9c8d7e6-f5a4-4b32-c1d0-e9f8a7b6c5d4',
        'Bali, Indonesia',
        'Relax on pristine beaches, explore ancient temples, and immerse yourself in Balinese culture. Discover lush rice terraces, vibrant coral reefs, and the warm hospitality of locals in this tropical paradise perfect for both adventure and relaxation.',
        '2025-07-20 00:00:00',
        '2025-07-30 00:00:00',
        1499,
        'il.co.johnbryce.yoavguterman/bali.webp',
        '2025-03-28 13:35:00',
        '2025-03-28 13:35:00'
    ),
    (
        'd7c6b5a4-e3f2-4d19-87f7-16a5b4c3d2e1',
        'Marrakech, Morocco',
        'Wander through the vibrant souks, explore intricate palaces, and experience the lively atmosphere of Djemaa el-Fna square. Discover the rich history, stunning architecture, and exotic flavors in this colorful North African gem.',
        '2025-10-05 00:00:00',
        '2025-10-12 00:00:00',
        1299,
        'il.co.johnbryce.yoavguterman/marrakech.jpg',
        '2025-03-28 13:40:00',
        '2025-03-28 13:40:00'
    );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `follows`
--
ALTER TABLE `follows` ADD PRIMARY KEY (`user_id`, `vacation_id`),
ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`, `vacation_id`),
ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations` ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--
--
-- Constraints for table `follows`
--
ALTER TABLE `follows` ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;