-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2020 at 02:55 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mvna_testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `audits`
--

CREATE TABLE `audits` (
  `id` int(11) NOT NULL,
  `user_log_id` int(11) DEFAULT NULL,
  `jwt_token` varchar(255) DEFAULT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `primary_id` int(11) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `old_value` longtext DEFAULT NULL,
  `new_value` longtext DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` longtext DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `audits`
--

INSERT INTO `audits` (`id`, `user_log_id`, `jwt_token`, `table_name`, `primary_id`, `event`, `old_value`, `new_value`, `url`, `ip_address`, `user_agent`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(16, 1, 'jhbgvhgvhgv', 'role', 15, 'POST', 'NULL', '\"{\"role\":\"giriram\",\"status\":1,\"created_by\":1,\"id\":18}\"', '/role', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36', 1, 1, NULL, '2020-08-24 10:02:42', '2020-08-24 10:02:42'),
(17, 1, 'jhbgvhgvhgv', 'role', 20, 'POST', 'NULL', '{\"role\":\"giriram\",\"status\":1,\"created_by\":1,\"id\":20}', '/role', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36', 1, 1, NULL, '2020-08-24 10:43:31', '2020-08-24 10:43:31'),
(18, 1, 'jhbgvhgvhgv', 'role', 21, 'POST', 'NULL', '{\"role\":\"giriram\",\"status\":1,\"created_by\":1,\"id\":21}', '/role', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36', 1, 1, NULL, '2020-08-24 10:44:15', '2020-08-24 10:44:15'),
(19, 1, 'jhbgvhgvhgv', 'role', 22, 'POST', 'NULL', '{\"role\":\"giriram\",\"status\":1,\"created_by\":1,\"id\":22}', '/role', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36', 1, 1, NULL, '2020-08-24 10:44:40', '2020-08-24 10:44:40'),
(20, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2lyaXJhbSIsInBhc3N3b3JkIjoiZ2lyaXJhbSIsImlhdCI6MTU5NjYyODI5NH0.6hQ3CDpbEOYrXS3bMQtygOKCjJfu8QLEZr26iHTcPJU', 'role', 24, 'POST', 'NULL', '{\"role\":\"giri\",\"status\":1,\"created_by\":1,\"id\":24}', '/role', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36', 1, 1, NULL, '2020-08-27 12:19:15', '2020-08-27 12:19:15');

-- --------------------------------------------------------

--
-- Table structure for table `design_name`
--

CREATE TABLE `design_name` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `design_name`
--

INSERT INTO `design_name` (`id`, `name`) VALUES
(1, 'title'),
(2, 'header'),
(3, 'Image'),
(4, 'content');

-- --------------------------------------------------------

--
-- Table structure for table `final_content`
--

CREATE TABLE `final_content` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `layout_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `final_content`
--

INSERT INTO `final_content` (`id`, `page_id`, `layout_id`, `order_id`, `content`) VALUES
(1, 1, 1, 1, '{\"id\": 1, \"name\": \"Monty\"}'),
(2, 1, 2, 1, '[\r\n    {\r\n        \"id\": 1,\r\n        \"menu_name\": \"Association\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 1,\r\n                \"menu_id\": 1,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 1,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 1,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"contentClass\",\r\n                        \"name\": \"title\"\r\n                    },\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 2,\r\n                        \"content\": null,\r\n                        \"image\": \"assets/img/testimg.png\",\r\n                        \"classtype\": \"ImageClass\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 2,\r\n        \"menu_name\": \"News&Media\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 2,\r\n                \"menu_id\": 2,\r\n                \"page_name\": \"news\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 2,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 3,\r\n        \"menu_name\": \"Association_Submenu\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": 1,\r\n        \"page\": [\r\n            {\r\n                \"id\": 3,\r\n                \"menu_id\": 3,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 3,\r\n                        \"page_id\": 3,\r\n                        \"design_id\": 3,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"Image\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]'),
(3, 1, 3, 1, '[\r\n    {\r\n        \"id\": 1,\r\n        \"menu_name\": \"Association\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 1,\r\n                \"menu_id\": 1,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 1,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 1,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"contentClass\",\r\n                        \"name\": \"title\"\r\n                    },\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 2,\r\n                        \"content\": null,\r\n                        \"image\": \"assets/img/testimg.png\",\r\n                        \"classtype\": \"ImageClass\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 2,\r\n        \"menu_name\": \"News&Media\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 2,\r\n                \"menu_id\": 2,\r\n                \"page_name\": \"news\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 2,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 3,\r\n        \"menu_name\": \"Association_Submenu\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": 1,\r\n        \"page\": [\r\n            {\r\n                \"id\": 3,\r\n                \"menu_id\": 3,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 3,\r\n                        \"page_id\": 3,\r\n                        \"design_id\": 3,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"Image\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]'),
(4, 1, 4, 1, '[\r\n    {\r\n        \"id\": 1,\r\n        \"menu_name\": \"Association\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 1,\r\n                \"menu_id\": 1,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 1,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 1,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"contentClass\",\r\n                        \"name\": \"title\"\r\n                    },\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 2,\r\n                        \"content\": null,\r\n                        \"image\": \"assets/img/testimg.png\",\r\n                        \"classtype\": \"ImageClass\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 2,\r\n        \"menu_name\": \"News&Media\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 2,\r\n                \"menu_id\": 2,\r\n                \"page_name\": \"news\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 2,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 3,\r\n        \"menu_name\": \"Association_Submenu\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": 1,\r\n        \"page\": [\r\n            {\r\n                \"id\": 3,\r\n                \"menu_id\": 3,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 3,\r\n                        \"page_id\": 3,\r\n                        \"design_id\": 3,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"Image\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `menu` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL COMMENT 'W-website\r\nA-admin panel',
  `parent_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `serial` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `menu`, `place`, `parent_id`, `url`, `icon`, `serial`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Home', 'w', 0, 'mvna/home', 'fa-fa home', 1, 1, 1, NULL, '2020-09-09 08:07:51', '2020-09-09 08:07:51'),
(2, 'About', 'w', 1, 'mvna/home', 'fa-fa home', 1, 1, 1, NULL, '2020-09-09 08:07:53', '2020-09-09 08:07:53'),
(3, 'home', 'w', 0, '/about/home', 'fa-fa user', 1, 1, 1, 1, '2020-09-09 09:01:02', '2020-09-09 09:01:02'),
(4, 'home', 'w', NULL, '/about/home', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 09:01:15', '2020-09-09 09:01:15'),
(5, 'home', 'w', 0, '/about/home', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 09:02:10', '2020-09-09 09:02:10'),
(6, 'home', 'w', 0, '/about/home', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 10:05:34', '2020-09-09 10:05:34'),
(7, 'home', 'w', 0, '/about/home', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 10:06:28', '2020-09-09 10:06:28'),
(8, 'home', 'w', 0, '/about/about', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 10:06:56', '2020-09-09 10:06:56'),
(9, 'home', 'w', 1, '/about/about', 'fa-fa user', 1, 1, 1, NULL, '2020-09-09 10:07:21', '2020-09-09 10:07:21');

-- --------------------------------------------------------

--
-- Table structure for table `output_content`
--

CREATE TABLE `output_content` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `design_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `content` varchar(150) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `classtype` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `output_content`
--

INSERT INTO `output_content` (`id`, `page_id`, `design_id`, `order_id`, `content`, `image`, `classtype`) VALUES
(1, 1, 1, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500', NULL, 'contentClass'),
(2, 1, 2, 2, NULL, 'assets/img/testimg.png', 'ImageClass'),
(3, 2, 2, 1, 'hbjhbjhbhh', NULL, 'gvghhgvgh'),
(4, 3, 3, 1, 'hbjhbjhbhh', NULL, 'gvghhgvgh');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `page_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `page_output`
--

CREATE TABLE `page_output` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `mvna_html` longtext DEFAULT NULL,
  `mvna_css` longtext DEFAULT NULL,
  `mvna_assets` longtext DEFAULT NULL,
  `mvna_styles` longtext DEFAULT NULL,
  `mvna_components` longtext DEFAULT NULL,
  `slug` longtext DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'admin', 2, NULL, NULL, '2020-08-18 07:04:35', '2020-08-18 07:04:35'),
(2, 'Super Admin', 1, NULL, NULL, '2020-08-18 07:04:38', '2020-08-18 07:04:38'),
(3, 'qazwsx', 1, 1, NULL, '2020-08-18 07:29:27', '2020-08-18 07:29:27'),
(4, '1', 1, 1, NULL, '2020-08-18 11:06:04', '2020-08-18 11:06:04'),
(5, 'giriram', 1, 1, NULL, '2020-08-24 09:30:47', '2020-08-24 09:30:47'),
(6, 'giriram', 1, 1, NULL, '2020-08-24 09:31:51', '2020-08-24 09:31:51'),
(7, 'giriram', 1, 1, NULL, '2020-08-24 09:32:09', '2020-08-24 09:32:09'),
(8, 'giriram', 1, 1, NULL, '2020-08-24 09:45:18', '2020-08-24 09:45:18'),
(9, 'giriram', 1, 1, NULL, '2020-08-24 09:47:48', '2020-08-24 09:47:48'),
(10, 'giriram', 1, 1, NULL, '2020-08-24 09:49:24', '2020-08-24 09:49:24'),
(11, 'giriram', 1, 1, NULL, '2020-08-24 09:56:57', '2020-08-24 09:56:57'),
(12, 'giriram', 1, 1, NULL, '2020-08-24 10:00:31', '2020-08-24 10:00:31'),
(13, 'giriram', 1, 1, NULL, '2020-08-24 10:01:44', '2020-08-24 10:01:44'),
(14, 'giriram', 1, 1, NULL, '2020-08-24 10:01:58', '2020-08-24 10:01:58'),
(15, 'giriram', 1, 1, NULL, '2020-08-24 10:02:42', '2020-08-24 10:02:42'),
(16, 'giriram', 1, 1, NULL, '2020-08-24 10:04:08', '2020-08-24 10:04:08'),
(17, 'giriram', 1, 1, NULL, '2020-08-24 10:18:12', '2020-08-24 10:18:12'),
(18, 'giriram', 1, 1, NULL, '2020-08-24 10:26:54', '2020-08-24 10:26:54'),
(19, 'giriram', 1, 1, NULL, '2020-08-24 10:28:39', '2020-08-24 10:28:39'),
(20, 'giriram', 1, 1, NULL, '2020-08-24 10:43:31', '2020-08-24 10:43:31'),
(21, 'giriram', 1, 1, NULL, '2020-08-24 10:44:14', '2020-08-24 10:44:14'),
(22, 'giriram', 1, 1, NULL, '2020-08-24 10:44:40', '2020-08-24 10:44:40'),
(23, 'giriram', 1, 1, NULL, '2020-08-24 10:45:18', '2020-08-24 10:45:18'),
(24, 'giri', 1, 1, NULL, '2020-08-27 12:19:15', '2020-08-27 12:19:15'),
(25, 'giri', 1, 1, NULL, '2020-08-27 12:19:32', '2020-08-27 12:19:32'),
(26, 'giri', 1, 1, NULL, '2020-08-27 12:20:03', '2020-08-27 12:20:03');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `role_permission` longtext DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`id`, `role_id`, `role_permission`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,34,35,36,31,37,38,39,40,41,42,43,44,45,46]', 1, 1, NULL, '2020-08-24 10:50:40', '2020-08-24 10:50:40'),
(2, 2, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,34,35,36,31,37,38,39,40,41,42,43,44,45,46]', 1, 1, NULL, '2020-08-24 10:51:05', '2020-08-24 10:51:05');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `giri` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `giri`) VALUES
(1, '[\r\n    {\r\n        \"id\": 1,\r\n        \"menu_name\": \"Association\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 1,\r\n                \"menu_id\": 1,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 1,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 1,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"contentClass\",\r\n                        \"name\": \"title\"\r\n                    },\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 1,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 2,\r\n                        \"content\": null,\r\n                        \"image\": \"assets/img/testimg.png\",\r\n                        \"classtype\": \"ImageClass\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 2,\r\n        \"menu_name\": \"News&Media\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": null,\r\n        \"page\": [\r\n            {\r\n                \"id\": 2,\r\n                \"menu_id\": 2,\r\n                \"page_name\": \"news\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 2,\r\n                        \"page_id\": 2,\r\n                        \"design_id\": 2,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"header\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"id\": 3,\r\n        \"menu_name\": \"Association_Submenu\",\r\n        \"is_parent\": 1,\r\n        \"parent_id\": 1,\r\n        \"page\": [\r\n            {\r\n                \"id\": 3,\r\n                \"menu_id\": 3,\r\n                \"page_name\": \"association\",\r\n                \"url\": \"website/association\",\r\n                \"page_content\": [\r\n                    {\r\n                        \"id\": 3,\r\n                        \"page_id\": 3,\r\n                        \"design_id\": 3,\r\n                        \"order_id\": 1,\r\n                        \"content\": \"hbjhbjhbhh\",\r\n                        \"image\": null,\r\n                        \"classtype\": \"gvghhgvgh\",\r\n                        \"name\": \"Image\"\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]');

-- --------------------------------------------------------

--
-- Table structure for table `twitter`
--

CREATE TABLE `twitter` (
  `id` int(11) NOT NULL,
  `twitter_id` varchar(255) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `text` longtext DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `jwt_token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role_id`, `user_id`, `email`, `mobile_number`, `password`, `jwt_token`, `avatar`, `otp`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'giri', 1, 'sup1', 'giriramdsk@gmail.com', '7708455749', '$2b$10$QrZuI/ZNdFXOyNSfD0yyqeNvAuUIkuQ6md4fAJfQAngd3RhvJZRXK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlX2lkIjoxLCJuYW1lIjoiZ2lyaSIsImVtYWlsIjoiZ2lyaXJhbWRza0BnbWFpbC5jb20ifSwiaWF0IjoxNTk4OTQwMjY0LCJleHAiOjE1OTg5NDM4NjR9.XgYD_UpPPyHAPC1ThbtcK57dfMX2p-rkbLqhfmrrnD0', NULL, NULL, 1, NULL, NULL, '2020-08-31 05:04:10', '2020-08-31 05:04:10'),
(2, 'giri', 2, NULL, 'test@gmail.com', '770845574', '$2b$10$yRqPpDaZnwEQMqahJt4jsO2uLigf/ZX7UYeB7WUNIWWhUUsLXIHiG', NULL, 'publicuploads1598873201626-500884039.jpeg', NULL, 1, 1, NULL, '2020-08-31 11:28:55', '2020-08-31 11:28:55'),
(3, 'giri', 3, NULL, 'test1@gmail.com', '770845574', '$2b$10$C9Vy729voCB2RtRkpsZDpuN6ksQaGTH5vqaWRW6RGVjuesNybvCyO', NULL, 'publicuploads1598873356262-338386751.jpeg', NULL, 1, 1, NULL, '2020-08-31 11:29:16', '2020-08-31 11:29:16'),
(4, 'giri', 1, NULL, 'girir@gms.com', '770845574', '$2b$10$.ol/T9ZXs4rJBEckaTWDMeXEWexkBh/67zG0lRCjgwIhiMW/VDQXy', NULL, 'publicuploads1598939862276-535393166.jpeg', NULL, 1, 1, NULL, '2020-09-01 05:57:42', '2020-09-01 05:57:42'),
(5, 'giri', 1, NULL, 'girir@gms.com', '770845574', '$2b$10$twTVBnkb4bh/vZjXelZUJ.XlBsKqix0LVGD2lsVKv439c3V1BfBza', NULL, 'publicuploads1598940967845-654847068.jpeg', NULL, 1, 1, NULL, '2020-09-01 06:16:07', '2020-09-01 06:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE `user_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `jwt_token` varchar(255) DEFAULT NULL,
  `log_in` datetime DEFAULT NULL,
  `log_out` datetime DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audits`
--
ALTER TABLE `audits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `design_name`
--
ALTER TABLE `design_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `final_content`
--
ALTER TABLE `final_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `output_content`
--
ALTER TABLE `output_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_output`
--
ALTER TABLE `page_output`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `twitter`
--
ALTER TABLE `twitter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audits`
--
ALTER TABLE `audits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `design_name`
--
ALTER TABLE `design_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `final_content`
--
ALTER TABLE `final_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `output_content`
--
ALTER TABLE `output_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page_output`
--
ALTER TABLE `page_output`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `twitter`
--
ALTER TABLE `twitter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
