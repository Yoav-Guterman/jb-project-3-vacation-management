-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 10, 2025 at 09:06 AM
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
        '034485be-cfd2-48a7-b80d-f54773eab18c',
        'j0t4v9t5-0v3v-3824-u3uv-17u6q9x4y14',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '034485be-cfd2-48a7-b80d-f54773eab18c',
        'l2v6x1v7-2x5x-5046-w5wx-39w8s1z6a36',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '034485be-cfd2-48a7-b80d-f54773eab18c',
        'n4x8z3x9-4z7z-7268-y7yz-51y0u3b8c58',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '034485be-cfd2-48a7-b80d-f54773eab18c',
        'p6z0b5z1-6b9b-9480-a9ab-73a2w5d0e70',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        '11a5c0a6-1c4c-4f35-b4bc-28bdc70f5e25',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        '33c7e2c8-3e6e-6157-d6de-40dff92f7g47',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        '55e9g4e0-5g8g-8379-f8fg-62f1b4i9j69',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        '77g1i6g2-7i0i-0591-h0hi-84h3d6k1l81',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        '99i3k8i4-9k2k-2713-j2jk-06j5f8m3n03',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        'b2l6n1l7-2n5n-5046-m5mn-39m8i1p6q36',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        '00j4l9j5-0l3l-3824-k3kl-17k6g9n4o14',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        '22b6d1b7-2d5d-5046-c5cd-39cee81f6f36',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        '44d8f3d9-4f7f-7268-e7ef-51e0a3h8i58',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        '66f0h5f1-6h9h-9480-g9gh-73g2c5j0k70',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        '88h2j7h3-8j1j-1602-i1ij-95i4e7l2m92',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '57ca1e6a-fc89-4d28-ad45-a1f351862cfc',
        'a1k5m0k6-1m4m-4935-l4lm-28l7h0o5p25',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '57ca1e6a-fc89-4d28-ad45-a1f351862cfc',
        'c3m7o2m8-3o6o-6157-n6no-40n9j2q7r47',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '57ca1e6a-fc89-4d28-ad45-a1f351862cfc',
        'e5o9q4o0-5q8q-8379-p8pq-62p1l4s9t69',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '57ca1e6a-fc89-4d28-ad45-a1f351862cfc',
        'g7q1s6q2-7s0s-0591-r0rs-84r3n6u1v81',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'a8c25830-579a-4f1d-98e0-9d5f06d2b3c7',
        '44d8f3d9-4f7f-7268-e7ef-51e0a3h8i58',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'a8c25830-579a-4f1d-98e0-9d5f06d2b3c7',
        'r8b2d7b3-8d1d-1602-c1cd-95c4y7f2g92',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'a8c25830-579a-4f1d-98e0-9d5f06d2b3c7',
        't0d4f9d5-0f3f-3824-e3ef-17e6a9h4i14',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'b742c63a-95b0-4d13-aef0-d14268cc439c',
        'd4n8p3n9-4p7p-7268-o7op-51o0k3r8s58',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'b742c63a-95b0-4d13-aef0-d14268cc439c',
        'f6p0r5p1-6r9r-9480-q9qr-73q2m5t0u70',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        '11a5c0a6-1c4c-4f35-b4bc-28bdc70f5e25',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'i9s3u8s4-9u2u-2713-t2tu-06t5p8w3x03',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'k1u5w0u6-1w4w-4935-v4vw-28v7r0y5z25',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'm3w7y2w8-3y6y-6157-x6xy-40x9t2a7b47',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'o5y9a4y0-5a8a-8379-z8za-62z1v4c9d69',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'q7a1c6a2-7c0c-0591-b0bc-84b3x6e1f81',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        's9c3e8c4-9e2e-2713-d2de-06d5z8g3h03',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        '22b6d1b7-2d5d-5046-c5cd-39cee81f6f36',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        '55e9g4e0-5g8g-8379-f8fg-62f1b4i9j69',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        '88h2j7h3-8j1j-1602-i1ij-95i4e7l2m92',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        'b2l6n1l7-2n5n-5046-m5mn-39m8i1p6q36',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        'h8r2t7r3-8t1t-1602-s1st-95s4o7v2w92',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
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
        '034485be-cfd2-48a7-b80d-f54773eab18c',
        'David',
        'Brown',
        'david@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '1230ae30-dc4f-4752-bd84-092956f5c633',
        'John',
        'Doe',
        'john@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14',
        'Jane',
        'Smith',
        'jane@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '57ca1e6a-fc89-4d28-ad45-a1f351862cfc',
        'Michael',
        'Johnson',
        'michael@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'a8c25830-579a-4f1d-98e0-9d5f06d2b3c7',
        'Sarah',
        'Miller',
        'sarah@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'b742c63a-95b0-4d13-aef0-d14268cc439c',
        'Robert',
        'Davis',
        'robert@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'bff2018c-b130-4de4-b645-3246b6e4dbb6',
        'Emily',
        'Williams',
        'emily@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c58f2ac1-b6df-45d2-84bc-e12bc9a8e321',
        'Jennifer',
        'Garcia',
        'jennifer@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'user',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'd9e5b712-71d0-4bb0-9a1c-f23ae6c3d6a8',
        'Admin',
        'User',
        'admin@example.com',
        '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628',
        'admin',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
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
        '00j4l9j5-0l3l-3824-k3kl-17k6g9n4o14',
        'Dubai, UAE',
        'Marvel at futuristic architecture, shop in luxury malls, and experience desert adventures.',
        '2025-10-05 00:00:00',
        '2025-10-12 00:00:00',
        1499,
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '11a5c0a6-1c4c-4f35-b4bc-28bdc70f5e25',
        'Paris, France',
        'Experience the city of love with its iconic Eiffel Tower, historic neighborhoods, and world-class cuisine.',
        '2025-06-15 00:00:00',
        '2025-06-22 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '22b6d1b7-2d5d-5046-c5cd-39cee81f6f36',
        'Rome, Italy',
        'Explore ancient ruins, Vatican City, and enjoy authentic Italian pizza and gelato.',
        '2025-07-10 00:00:00',
        '2025-07-17 00:00:00',
        1199,
        'https://images.unsplash.com/photo-1529260830199-42c24126f198',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '33c7e2c8-3e6e-6157-d6de-40dff92f7g47',
        'Tokyo, Japan',
        'Discover the perfect blend of traditional culture and ultramodern living in Japan\'s bustling capital.',
        '2025-09-05 00:00:00',
        '2025-09-15 00:00:00',
        1599,
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '44d8f3d9-4f7f-7268-e7ef-51e0a3h8i58',
        'Bali, Indonesia',
        'Relax on beautiful beaches, visit ancient temples, and immerse yourself in Balinese culture.',
        '2025-08-20 00:00:00',
        '2025-08-30 00:00:00',
        1099,
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '55e9g4e0-5g8g-8379-f8fg-62f1b4i9j69',
        'New York City, USA',
        'Experience the city that never sleeps with its iconic skyline, Broadway shows, and diverse neighborhoods.',
        '2025-04-10 00:00:00',
        '2025-04-17 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '66f0h5f1-6h9h-9480-g9gh-73g2c5j0k70',
        'Barcelona, Spain',
        'Enjoy beautiful architecture, Mediterranean beaches, and tasty tapas in this vibrant city.',
        '2025-05-15 00:00:00',
        '2025-05-22 00:00:00',
        1099,
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '77g1i6g2-7i0i-0591-h0hi-84h3d6k1l81',
        'Sydney, Australia',
        'Visit the famous Opera House, beautiful harbors, and enjoy the laid-back Australian lifestyle.',
        '2025-11-10 00:00:00',
        '2025-11-20 00:00:00',
        1799,
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '88h2j7h3-8j1j-1602-i1ij-95i4e7l2m92',
        'Santorini, Greece',
        'Relax on dramatic volcanic beaches and admire stunning sunsets over white-washed buildings.',
        '2025-06-25 00:00:00',
        '2025-07-02 00:00:00',
        1399,
        'https://images.unsplash.com/photo-1566478989037-eec170784d0b',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        '99i3k8i4-9k2k-2713-j2jk-06j5f8m3n03',
        'Cancun, Mexico',
        'Enjoy pristine beaches, explore ancient Mayan ruins, and experience vibrant nightlife.',
        '2025-03-15 00:00:00',
        '2025-03-22 00:00:00',
        999,
        'https://images.unsplash.com/photo-1552074283-b2de7daab9ae',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'a1k5m0k6-1m4m-4935-l4lm-28l7h0o5p25',
        'London, England',
        'Explore historic landmarks, world-class museums, and charming neighborhoods in this iconic city.',
        '2025-05-20 00:00:00',
        '2025-05-27 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'b2l6n1l7-2n5n-5046-m5mn-39m8i1p6q36',
        'Machu Picchu, Peru',
        'Hike to the ancient Incan citadel and enjoy breathtaking mountain views.',
        '2025-08-10 00:00:00',
        '2025-08-17 00:00:00',
        1599,
        'https://images.unsplash.com/photo-1587595431973-160d0d94901a',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'c3m7o2m8-3o6o-6157-n6no-40n9j2q7r47',
        'Bangkok, Thailand',
        'Experience bustling street markets, ornate temples, and delicious Thai cuisine.',
        '2025-11-15 00:00:00',
        '2025-11-22 00:00:00',
        1099,
        'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'd4n8p3n9-4p7p-7268-o7op-51o0k3r8s58',
        'Cairo, Egypt',
        'Discover ancient pyramids, the Sphinx, and the rich history of Egypt.',
        '2025-09-20 00:00:00',
        '2025-09-27 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'e5o9q4o0-5q8q-8379-p8pq-62p1l4s9t69',
        'Rio de Janeiro, Brazil',
        'Enjoy beautiful beaches, vibrant culture, and stunning mountain views.',
        '2025-02-10 00:00:00',
        '2025-02-17 00:00:00',
        1399,
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'f6p0r5p1-6r9r-9480-q9qr-73q2m5t0u70',
        'Venice, Italy',
        'Experience a unique city built on water with romantic canals and historic architecture.',
        '2025-04-25 00:00:00',
        '2025-05-02 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'g7q1s6q2-7s0s-0591-r0rs-84r3n6u1v81',
        'Prague, Czech Republic',
        'Explore a fairy-tale city with medieval architecture and charming cobblestone streets.',
        '2025-06-10 00:00:00',
        '2025-06-17 00:00:00',
        1199,
        'https://images.unsplash.com/photo-1541849546-216549ae216d',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'h8r2t7r3-8t1t-1602-s1st-95s4o7v2w92',
        'Kyoto, Japan',
        'Experience traditional Japanese culture with temples, gardens, and geisha districts.',
        '2025-10-15 00:00:00',
        '2025-10-22 00:00:00',
        1499,
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'i9s3u8s4-9u2u-2713-t2tu-06t5p8w3x03',
        'Amsterdam, Netherlands',
        'Explore picturesque canals, historic buildings, and world-class museums.',
        '2025-07-25 00:00:00',
        '2025-08-01 00:00:00',
        1199,
        'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'j0t4v9t5-0v3v-3824-u3uv-17u6q9x4y14',
        'Marrakech, Morocco',
        'Discover colorful markets, stunning palaces, and rich Moroccan culture.',
        '2025-03-05 00:00:00',
        '2025-03-12 00:00:00',
        1099,
        'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'k1u5w0u6-1w4w-4935-v4vw-28v7r0y5z25',
        'Maldives',
        'Relax in overwater bungalows on pristine white-sand beaches and crystal-clear waters.',
        '2025-12-10 00:00:00',
        '2025-12-17 00:00:00',
        1999,
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'l2v6x1v7-2x5x-5046-w5wx-39w8s1z6a36',
        'Vienna, Austria',
        'Experience a city rich in music, culture, and elegant architecture.',
        '2025-12-15 00:00:00',
        '2025-12-22 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1516550893885-985c3844373e',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'm3w7y2w8-3y6y-6157-x6xy-40x9t2a7b47',
        'Cape Town, South Africa',
        'Enjoy scenic mountain views, beautiful beaches, and exciting wildlife encounters.',
        '2025-01-20 00:00:00',
        '2025-01-27 00:00:00',
        1399,
        'https://images.unsplash.com/photo-1576485375217-d6a95e37f0ee',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'n4x8z3x9-4z7z-7268-y7yz-51y0u3b8c58',
        'Seoul, South Korea',
        'Experience a vibrant mix of modern skyscrapers and traditional temples.',
        '2025-05-05 00:00:00',
        '2025-05-12 00:00:00',
        1399,
        'https://images.unsplash.com/photo-1585132758711-a116713c4eed',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'o5y9a4y0-5a8a-8379-z8za-62z1v4c9d69',
        'Buenos Aires, Argentina',
        'Discover a city with rich cultural heritage, tango music, and delicious cuisine.',
        '2025-11-25 00:00:00',
        '2025-12-02 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1612294037637-ec328d0e075e',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'p6z0b5z1-6b9b-9480-a9ab-73a2w5d0e70',
        'Stockholm, Sweden',
        'Explore a beautiful city spread across 14 islands with stunning architecture.',
        '2025-07-15 00:00:00',
        '2025-07-22 00:00:00',
        1299,
        'https://images.unsplash.com/photo-1587425419269-869c25f4d212',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'q7a1c6a2-7c0c-0591-b0bc-84b3x6e1f81',
        'Queenstown, New Zealand',
        'Experience adventure activities and breathtaking natural scenery.',
        '2025-02-15 00:00:00',
        '2025-02-22 00:00:00',
        1599,
        'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        'r8b2d7b3-8d1d-1602-c1cd-95c4y7f2g92',
        'Florence, Italy',
        'Discover the birthplace of the Renaissance with stunning art and architecture.',
        '2025-09-15 00:00:00',
        '2025-09-22 00:00:00',
        1199,
        'https://images.unsplash.com/photo-1543429776-2782fc8e1acd',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        's9c3e8c4-9e2e-2713-d2de-06d5z8g3h03',
        'Hong Kong',
        'Experience a dynamic city with stunning skyscrapers, vibrant markets, and delicious cuisine.',
        '2025-10-25 00:00:00',
        '2025-11-01 00:00:00',
        1399,
        'https://images.unsplash.com/photo-1536599018102-9f6700e1e3805',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
    ),
    (
        't0d4f9d5-0f3f-3824-e3ef-17e6a9h4i14',
        'Reykjavik, Iceland',
        'Discover dramatic landscapes with geysers, waterfalls, and the Northern Lights.',
        '2025-08-05 00:00:00',
        '2025-08-12 00:00:00',
        1599,
        'https://images.unsplash.com/photo-1525890330427-b48526fae41b',
        '2025-03-10 09:04:53',
        '2025-03-10 09:04:53'
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