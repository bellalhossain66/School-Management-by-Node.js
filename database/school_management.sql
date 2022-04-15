-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2022 at 03:35 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'bellal Hossain', 'bellalhoss66@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `name`) VALUES
(1, 'class 1'),
(2, 'class 2'),
(3, 'class 3'),
(4, 'class 4'),
(5, 'class 5'),
(6, 'class 6'),
(7, 'class 7'),
(8, 'class 8'),
(9, 'class 9'),
(10, 'class 10'),
(11, 'class 11'),
(12, 'class 12');

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE `Course` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `class` varchar(10) NOT NULL,
  `teacherId` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`id`, `title`, `class`, `teacherId`) VALUES
(1, 'bangla', 'class 10', 'bellalhoss66'),
(2, 'Bangla', 'class 1', 'bellalhoss66'),
(3, 'Bangla', 'class 2', 'bellalhoss66'),
(4, 'Bangla', 'class 3', 'bellalhoss66'),
(5, 'Bangla', 'class 4', 'bellalhoss66'),
(6, 'English', 'class 1', 'bellalhoss66'),
(7, 'English', 'class 10', 'bellalhoss66');

-- --------------------------------------------------------

--
-- Table structure for table `course_enroll`
--

CREATE TABLE `course_enroll` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `studentId` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_enroll`
--

INSERT INTO `course_enroll` (`id`, `courseId`, `studentId`) VALUES
(1, 1, 'bellalhoss66'),
(2, 7, 'bellalhoss66'),
(3, 2, 'bellalhoss66'),
(4, 3, 'bellalhoss66');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `teacherId` varchar(70) NOT NULL,
  `action` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `courseId`, `title`, `teacherId`, `action`) VALUES
(1, 1, 'In what year was Kazi Nazrul born?', 'bellalhoss66', 0),
(2, 1, 'In what year was bangladesh got independent?', 'bellalhoss66', 0),
(3, 1, 'In what year was Jasimuddin PP born?', 'bellalhoss66', 0),
(4, 1, 'In what year was bangladesh got independent?', 'bellalhoss66', 0),
(5, 7, 'What did Lencho hope for?', 'bellalhoss66', 0),
(6, 7, 'Why was Lencho satisfied?', 'bellalhoss66', 0),
(7, 7, 'Why did Lencho need money?', 'bellalhoss66', 0),
(12, 7, 'Why did Lencho need money?', 'bellalhoss66', 0);

-- --------------------------------------------------------

--
-- Table structure for table `que_option`
--

CREATE TABLE `que_option` (
  `id` int(11) NOT NULL,
  `sub_title` varchar(255) NOT NULL,
  `ques_Id` int(11) NOT NULL,
  `correct` int(11) NOT NULL,
  `action` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `que_option`
--

INSERT INTO `que_option` (`id`, `sub_title`, `ques_Id`, `correct`, `action`) VALUES
(1, '1879', 1, 0, 0),
(2, '1889', 1, 0, 0),
(3, '1899', 1, 1, 0),
(4, '1809', 1, 0, 0),
(5, '1961', 2, 0, 0),
(6, '1971', 2, 1, 0),
(7, '1981', 2, 0, 0),
(8, '1991', 2, 0, 0),
(9, '1951', 3, 1, 0),
(10, '1952', 3, 0, 0),
(11, '1953', 3, 0, 0),
(12, '1954', 3, 0, 0),
(13, '1971', 4, 1, 0),
(14, '1972', 4, 0, 0),
(15, '1973', 4, 0, 0),
(16, '1974', 4, 0, 0),
(18, ' A tractor', 5, 0, 0),
(19, 'tractor', 5, 1, 0),
(20, 'tractor', 5, 0, 0),
(21, 'None of the Above', 5, 0, 0),
(22, 'option1', 12, 0, 0),
(23, 'option2', 12, 0, 0),
(24, 'option3', 12, 1, 0),
(25, 'option4', 12, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `userId` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `class` varchar(10) NOT NULL,
  `action` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `first_name`, `last_name`, `userId`, `email`, `password`, `class`, `action`) VALUES
(1, 'Bellal', 'Hossain', 'bellalhoss66', 'bellalhoss66@gmail.com', '$2b$10$ViAnrS0kSGXUquCzPxwBV.h.izEZAAcq9VEuPmvgQxmCf6/7TJKKe', 'class 10', 0),
(2, 'test', 'test', 'test', 'test@gmail.com', '$2b$10$V34Xp60ifFVtxEBgbln4Me/MsuMlR5uJGZKwNnaAB3m/7WUyxDHqe', 'class 10', 1),
(4, 'test2', 'test2', 'test2', 'test2@gmail.com', '$2b$10$NWo/LzBLhgWUWX1DL7UnR.yOsl4O2le4rtScR9owWGYEZILXeBgdK', 'class 11', 1),
(5, 'test5', 'test5', 'test5', 'test5@gmail.com', '$2b$10$/552KD8GfV2vHd0gi.9WfuSpf3lbbooudHNlCn2Nz17lLLQSbPNfW', 'class 10', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `userId` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `action` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `first_name`, `last_name`, `userId`, `email`, `password`, `action`) VALUES
(1, 'Bellal', 'Hossain', 'bellalhoss66', 'bellalhoss66@gmail.com', '$2b$10$WwUm/egPMAUoYqLVye3Xn.vdr7sMBtt0LO2Q3yLmt0ipPpGB4CLUW', 0),
(2, 'test', 'test', 'test', 'test@gmail.com', '$2b$10$VD0Yj7snc5oDDNdFNop03em/We5alKZyawCRE3YGhQbFrVGeY97B6', 0),
(4, 'test20', 'test20', 'test', 'test@gmail.com', '$2b$10$60wzw.1xErQMLYWTqBfijuUsAiLssMOWWzJqO6HZPZIFAs2kSQDtC', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_enroll`
--
ALTER TABLE `course_enroll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `que_option`
--
ALTER TABLE `que_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Course`
--
ALTER TABLE `Course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `course_enroll`
--
ALTER TABLE `course_enroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `que_option`
--
ALTER TABLE `que_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
