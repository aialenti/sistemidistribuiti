SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `matchdays` (
  `flag` boolean NOT NULL,
  `number` int(2) NOT NULL,
  `season` int(4) NOT NULL,
  PRIMARY KEY (`flag`, `number`, `season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `home_team` int(11),
  `away_team` int(11),
  `matchdays_flag` boolean,
  `matchdays_number` int(2),
  `matchdays_season` int(4),
  FOREIGN KEY(`matchdays_flag`, `matchdays_number`, `matchdays_season`) REFERENCES matchdays(`flag`, `number`, `season`),
  FOREIGN KEY(`home_team`) REFERENCES teams(`id`),
  FOREIGN KEY(`away_team`) REFERENCES teams(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` boolean NOT NULL,
  `time` int(3) NOT NULL,
  `player` varchar(255) NOT NULL,
  `match_id` int(11) NOT NULL,
  FOREIGN KEY (`match_id`) REFERENCES matches(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;