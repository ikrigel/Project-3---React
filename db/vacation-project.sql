-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2022 at 05:50 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation-project`
--
--DROP DATABASE IF EXISTS `vacation-project`;
--CREATE DATABASE IF NOT EXISTS `vacation-project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
--USE `vacation-project`;

-- --------------------------------------------------------

--
-- Table structure for table `followedvacations`
--

DROP TABLE IF EXISTS `followedvacations`;
CREATE TABLE `followedvacations` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followedvacations`
--

INSERT INTO `followedvacations` (`userId`, `vacationId`) VALUES
(2, 6),
(2, 3),
(3, 1),
(3, 2),
(2, 1),
(2, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 6),
(4, 3),
(7, 2),
(7, 1),
(7, 4),
(2, 6),
(6, 38),
(12, 38),
(1, 3),
(5, 35),
(6, 37),
(12, 1),
(12, 2),
(6, 27),
(9, 28),
(6, 42),
(6, 41),
(12, 3),
(10, 42),
(10, 38),
(10, 3),
(13, 42),
(10, 41),
(11, 42),
(6, 5),
(6, 4),
(6, 1),
(6, 2),
(13, 3),
(13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(40) CHARACTER SET utf8 NOT NULL,
  `lastName` varchar(40) CHARACTER SET utf8 NOT NULL,
  `username` varchar(40) CHARACTER SET utf8 NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Moishe', 'Ufnik', 'Moishe', '1234', 1),
(2, 'Kipi', 'Ben-Kipod', 'Kipi', 'abcd', 1),
(3, 'Ugi', 'Fletzet', 'Ugi', 'cool', 1),
(4, 'Kermit', 'The-Frog', 'Kermit', 'abcd', 1),
(5, 'Igal', 'Krigel', 'igal', 'igal', 1),
(6, 'Polo', 'Krigel', 'polo', 'polo', 2),
(7, 'יגאל', 'קריגל', 'igal2', 'igal2', 1),
(8, 'Igal2', 'Krigel', 'igal3', 'igal3', 1),
(9, 'פולו', 'קריגל', 'פולו', 'פולו', 2),
(10, 'יגאל', 'קריגל', 'admin', 'admin', 2),
(11, 'user', 'user', 'user', 'user', 1),
(12, 'polo ', 'The Best', '1111', '1111', 1),
(13, 'user', 'user2', 'user2', 'user2', 1),
(14, 'יגאל', 'קריגל', 'user3', 'user3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `fromDate` datetime NOT NULL,
  `toDate` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `fromDate`, `toDate`, `price`) VALUES
(1, 'Set in the heart of Miami Beach in the popular Mid-Beach area, this resort offers a tropical escape amidst all the hustle and bustle. Inspired by nature, this oceanfront sanctuary emphasizes health and total wellness through natural gourmet dining and Aveda spa rituals while green practises and environmental awareness are at the centre of each guest experience.', 'Miami: The Palms Hotel', '1.jpg', '2022-03-15 19:27:00', '2022-04-09 19:27:00', '999.00'),
(2, 'Located just a few miles from the fishing village of Kailua-Kona, this intimate oceanfront one- and two-bedroom condominium resort offers the simplicity and comfort of \"home away from home\".\r\n\r\n', 'Hawaii Island - Aston Kona', '2.jpg', '2022-03-15 19:34:00', '2022-04-09 19:34:00', '3576.04'),
(3, 'Inspired by the vibrant culture of Guanacaste, this eclectic resort boasts a bold design and exemplifies the best of Tico culture. Guests can start the day at Zona Azul Beach Club enjoying the white sands of Playa Conchal and end it experiencing the amazing sunsets in the Living Room imbibing craft ', 'Costa Rica', '3.jpg', '2020-06-10 00:00:00', '2020-06-15 00:00:00', '899.00'),
(4, 'Set beachfront in the lively hotel zone, this all-inclusive resort features three pools, including one for kids, a selection of restaurants, a kids’ club, and a small, relaxing spa.\r\n\r\n', 'Mexico -Omni Cancun', '4.jpg', '2020-05-06 00:00:00', '2020-05-12 00:00:00', '1300.00'),
(5, 'If you enjoy eating like royalty, gambling in style and taking in world-class entertainment, this all-suite hotel might be an excellent bet for your next Las Vegas holiday.', 'Las Vegas - The Venetian', '5.jpg', '2020-04-26 00:00:00', '2020-04-30 00:00:00', '1800.00'),
(6, 'Enjoy the newly-redesigned Hokupa\'a Tower at The Westin Maui. Guests staying in Hokupa\'a Tower rooms will receive exclusive concierge service, exclusive access to The Lanai at Hokupa\'a which features premier panoramic ocean views, complimentary artisanal Hawaiian small bites at breakfast served daily, exclusive access to infinity edge cocktail pools, a close up of Chase the Sunset torch lighting experience, daily cultural experiences and more.', 'The Westin Maui Resort & Spa', 'ddcbbd7f-cf2a-4740-972d-3b599225b090.jpg', '2022-10-01 14:00:00', '2022-12-02 21:00:00', '2499.00'),
(7, 'Formerly known as Now Amber Puerto Vallarta, this family-friendly, all-inclusive resort is located in the hotel zone.', 'Dreams Vallarta Bay Resort', '2a15c04f-a0ff-49e4-8667-0b25a70fe7e8.jpg', '2022-04-13 20:37:00', '2022-06-02 20:35:00', '333.00'),
(8, 'Take your kids to the vacation & you dog as well', 'Sara will watch your kids while you are on vacation', 'dbd07908-2286-41c6-b4ef-cb0202df6877.jpg', '2021-12-28 00:00:00', '2022-03-15 22:18:00', '2222.00'),
(9, 'You should be there in the coming Passover', 'Hawaii Island - Aston Kona - amazing vacation', 'e224a9e8-1731-4e13-abf8-6fee61d5ea3b.jpg', '2022-02-24 14:47:00', '2022-03-09 15:47:00', '4444.00'),
(21, 'Kikkoman vacation', 'Traveling to Soya land', '7415b2d8-6176-4ef1-bffa-63e4f03ced95.jpg', '2022-03-09 15:05:00', '2022-04-15 15:06:00', '446.00'),
(24, 'Polo is looking forward to welcoming you. The islands offer a variety of accommodations to meet everyone needs. From resorts, hotels to condos, there are different options to choose from that will satisfy any budget.', 'Polo is Calling', 'a6d1ba6e-b020-4a24-b2e0-70a4a34b1161.jpg', '2022-02-24 01:33:00', '2022-03-10 01:33:00', '0.15'),
(25, 'Polo vacation - going for a walk around the block.\r\nAmazing tour with Polo.', 'Polo vacation - going for a walk around the block', '0bba94a9-52c0-4cc3-bc40-1a4050ee219d.jpg', '2022-02-09 22:57:00', '2022-03-30 22:57:00', '3333.00'),
(26, 'כיף של קיץ', 'חופשת התחרדנות בשמש', '235c3ab1-4998-4786-beba-549e684ea353.jpg', '2021-12-07 02:32:00', '2022-04-13 22:55:00', '1233.00'),
(27, 'בחסות ווילי וונקה', 'חופשת שוקולד', 'e4f47694-d6c2-4d2d-ad3f-dd55125ff9e6.jpg', '2022-03-09 22:53:00', '2022-04-21 22:54:00', '333.00'),
(28, 'Have a good night', 'Dreams vacation with Polo', '9779f25a-ffca-4c37-942a-42798635d763.jpg', '2022-02-09 22:52:00', '2022-03-03 22:52:00', '888.00'),
(33, 'חופשת ספא יוקרתית. חלום מתערבב עם מציאות.', 'חופשת ספא יוקרתית', '314600c2-cbef-432e-b8d6-297889bd9624.jpg', '2022-03-01 12:13:00', '2022-03-11 12:13:00', '666.00'),
(35, 'כי גם לי מגיע לאכול קצת ביצי דגים', 'חופשת קוויאר', '6fcb6ca2-68ea-446b-80aa-1b1d5c609db8.jpg', '2022-03-01 13:28:00', '2022-03-12 13:28:00', '999.99'),
(36, 'בחג הפסח הקרוב - חופשת מצות מהחלומות.', 'חופשת מצות מפנקת', 'f854c269-442e-45dd-8848-5a0450496e79.jpg', '2022-04-05 22:24:00', '2022-04-28 22:23:00', '55.60'),
(37, 'NEW Important Requirements: Walt Disney World Resort Reservations. As Walt Disney World Resort reopens, Park attendance will be strictly managed through a new Park reservation system. Guests who do not have an advance Park reservation will be denied entry. To enter a Park on a particular day, both a Park reservation for that day and a Ticket valid for Park admission on that day are required. it is recommended all Guests visit www.Disneytraveltradeinfo.com/wdwws. ', 'Walt Disney World Resort On-Site Collection Promotional Package', 'd55638eb-0a20-40c9-a345-f8746eb5aa7d.JPG', '2022-06-27 22:15:00', '2022-08-18 22:14:00', '6656.99'),
(38, 'Eating cheese in the meadow with the cows around.', 'Vacation to cheese land', '73344e66-5a37-4984-a23f-34c06368677f.jpg', '2022-03-01 19:18:00', '2022-04-07 20:23:00', '333.00'),
(41, 'Traveling around the pools with Polo. Polo is going for a swim in the pool during the trip.', 'Travelling with Polo to the fishing pools', '231fd776-7f49-4f08-9b86-88ea9bbbd357.jpg', '2022-03-09 19:16:00', '2022-03-11 19:16:00', '1999.00'),
(42, 'Traveling across the village with Polo', 'Vacation with Polo', '87af7979-7785-4178-9c37-9214bfdedc78.jpg', '2022-03-09 19:05:00', '2022-03-23 19:04:00', '555.00'),
(48, 'Eating Marmalade from the jams all day long with Winy the POO', 'Travel to Marmalade land', '68fcd1fb-34aa-45aa-8895-9cb090867743.jpg', '2022-03-01 11:24:00', '2022-03-11 10:25:00', '666.00'),
(49, 'נוסעים יחדיו לגבע לשחק עם חברים ולחזור עייפים ומרוצים.\r\n', 'טיול עם מאור', '6a48ca4a-db19-49dc-90d9-76fd77c5480e.jpeg', '2022-03-10 20:51:00', '2022-03-11 20:51:00', '99999.00'),
(51, 'ניר נשכב על שמיכה רכה באחורי הקלאבקאר, בליל אביב חמים ונעים ונוסעים לטיול יחדיו לפני שינה.', 'טיול לילה עם ניר', '8eba9fcc-2e90-4b6f-a36a-e46f036fdae1.jpg', '2022-03-11 21:11:00', '2022-03-18 21:54:00', '1222.00'),
(52, 'חופשה עם עצמי', 'טיול עם פולו סביב הישוב', '0c129de4-2c7b-415f-b872-09aece14c568.jpg', '2022-03-16 21:55:00', '2022-03-25 21:56:00', '555.00'),
(53, 'חופשה עם עדי', 'נסיעה עם קלאבקאר בשדות', '7875ccd6-eeb7-4343-8ca5-49957628d803.jpg', '2022-03-05 22:24:00', '2022-03-15 22:24:00', '199.00'),
(54, 'חופשה עם איתן החמוד', 'משחק כדורסל עם איתן', 'dca8d2cc-7df0-42ff-a5a6-c902ae214b06.jpg', '2022-03-10 22:26:00', '2022-03-25 22:26:00', '99.00'),
(55, 'חופשה עם ניר החמוד', 'טיול עם ניר ברחבי המושב', 'eea21b22-3eed-4a5d-b196-70c7f4aac343.jpg', '2022-03-10 22:31:00', '2022-03-31 22:31:00', '999.00'),
(56, 'חופשה מהילדים', 'רחוק מהבית', '20e1c43f-0487-46f6-8af0-9d31d1f60c13.jpg', '2022-03-08 17:41:00', '2022-03-24 17:41:00', '200.40'),
(57, 'חופשה עם פולו', 'שדות המושב', '9ca67121-5d81-44c9-b950-c06e1e48ca83.jpg', '2022-03-08 17:46:00', '2022-03-15 17:46:00', '8888.00'),
(58, 'ניר החמוד', 'הולך איתי לטיול', '8b811cfd-6aa5-4e6c-9ea8-9024e070d992.jpg', '2022-05-17 02:36:00', '2022-05-25 00:00:00', '88888.10'),
(59, 'Formerly known as Now Amber Puerto Vallarta, this family-friendly, all-inclusive resort is located in the hotel zone, and features three pools, a variety of restaurants and bars.', 'Dreams Vallarta Bay Resort', '91f71fb4-9dda-44e3-9cab-d2ee593f3c77.jpg', '2022-03-16 22:03:00', '2022-03-31 22:03:00', '2444.00'),
(60, 'This hotel is located in the heart of Mauis premier resort area fronting world-famous Kaanapali Beach. With 432 rooms, one main restaurant, and a poolside bar and grill, this is the ideal setting to turn Hawaiian dreams into lifelong memories. Serenades by employees, complimentary evening entertainment and hula show, Hawaiian cultural activities, a free year-round kids program, and a departure lei ceremony add to the value.', 'Kaanapali Beach Hotel', 'c6038c57-b74a-4079-94dc-6c34e1c2daea.jpg', '2022-08-09 23:07:00', '2022-09-09 23:07:00', '1777.56'),
(62, 'ניר ילדי המדהים ואני הולכים לטייל יחדיו ברחבי המושב.\r\nפולו צועדת לידינו ורודפת אחר חתולים.', 'אני אוהב את ניר', 'ea642d98-a67b-4e42-9616-4a33ef0274db.jpg', '2022-03-10 18:19:00', '2022-03-11 18:19:00', '999.00'),
(63, 'Love Love Love', 'Love the vacation    ', '0e8c9543-71ec-4c03-98f6-cab895ede0ce.jpg', '2022-03-14 16:20:00', '2022-04-04 00:00:00', '8888.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD KEY `userId` (`userId`) USING BTREE,
  ADD KEY `vacationId` (`vacationId`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD CONSTRAINT `followedvacations_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followedvacations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
