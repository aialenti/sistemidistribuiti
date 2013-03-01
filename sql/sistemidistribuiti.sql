
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO countries(name) VALUES('Afghanistan');
INSERT INTO countries(name) VALUES('Albania');
INSERT INTO countries(name) VALUES('Algeria');
INSERT INTO countries(name) VALUES('American Samoa');
INSERT INTO countries(name) VALUES('Andorra');
INSERT INTO countries(name) VALUES('Angola');
INSERT INTO countries(name) VALUES('Anguilla');
INSERT INTO countries(name) VALUES('Antarctica');
INSERT INTO countries(name) VALUES('Antigua and Barbuda');
INSERT INTO countries(name) VALUES('Argentina');
INSERT INTO countries(name) VALUES('Armenia');
INSERT INTO countries(name) VALUES('Aruba');
INSERT INTO countries(name) VALUES('Australia');
INSERT INTO countries(name) VALUES('Austria');
INSERT INTO countries(name) VALUES('Azerbaijan');
INSERT INTO countries(name) VALUES('Bahamas');
INSERT INTO countries(name) VALUES('Bahrain');
INSERT INTO countries(name) VALUES('Bangladesh');
INSERT INTO countries(name) VALUES('Barbados');
INSERT INTO countries(name) VALUES('Belarus ');
INSERT INTO countries(name) VALUES('Belgium ');
INSERT INTO countries(name) VALUES('Belize');
INSERT INTO countries(name) VALUES('Benin');
INSERT INTO countries(name) VALUES('Bermuda');
INSERT INTO countries(name) VALUES('Bhutan');
INSERT INTO countries(name) VALUES('Bolivia');
INSERT INTO countries(name) VALUES('Bosnia and Herzegowina');
INSERT INTO countries(name) VALUES('Botswana');
INSERT INTO countries(name) VALUES('Bouvet Island');
INSERT INTO countries(name) VALUES('Brazil');
INSERT INTO countries(name) VALUES('British Indian Ocean');
INSERT INTO countries(name) VALUES('Brunei Darussalam');
INSERT INTO countries(name) VALUES('Bulgaria');
INSERT INTO countries(name) VALUES('Burkina Faso ');
INSERT INTO countries(name) VALUES('Burundi');
INSERT INTO countries(name) VALUES('Cambodia ');
INSERT INTO countries(name) VALUES('Cameroon ');
INSERT INTO countries(name) VALUES('anada');
INSERT INTO countries(name) VALUES('Cape Verde');
INSERT INTO countries(name) VALUES('Cayman Islands');
INSERT INTO countries(name) VALUES('Central African Republic');
INSERT INTO countries(name) VALUES('Chad');
INSERT INTO countries(name) VALUES('Chile');
INSERT INTO countries(name) VALUES('China');
INSERT INTO countries(name) VALUES('Christmas Island');
INSERT INTO countries(name) VALUES('Cocos (Keeling) Islands');
INSERT INTO countries(name) VALUES('Colombia');
INSERT INTO countries(name) VALUES('Comoros');
INSERT INTO countries(name) VALUES('Congo (Democratic Republic of the)');
INSERT INTO countries(name) VALUES('Congo (Republic of the)');
INSERT INTO countries(name) VALUES('Cook islands');
INSERT INTO countries(name) VALUES('Costa Rica');
INSERT INTO countries(name) VALUES('Cote dIvoire (Ivory Coast)');
INSERT INTO countries(name) VALUES('Croatia');
INSERT INTO countries(name) VALUES('Cuba');
INSERT INTO countries(name) VALUES('Curaco');
INSERT INTO countries(name) VALUES('Cyprus');
INSERT INTO countries(name) VALUES('Cyprus (Turkish Republic of Northern)');
INSERT INTO countries(name) VALUES('Czech Republic');
INSERT INTO countries(name) VALUES('Denmark');
INSERT INTO countries(name) VALUES('Djibouti ');
INSERT INTO countries(name) VALUES('Dominica');
INSERT INTO countries(name) VALUES('Dominican Republic');
INSERT INTO countries(name) VALUES('East Timor');
INSERT INTO countries(name) VALUES('Ecuador');
INSERT INTO countries(name) VALUES('Egypt');
INSERT INTO countries(name) VALUES('El Salvador');
INSERT INTO countries(name) VALUES('Equatorial Guinea');
INSERT INTO countries(name) VALUES('Eritrea');
INSERT INTO countries(name) VALUES('Estonia');
INSERT INTO countries(name) VALUES('Ethiopia');
INSERT INTO countries(name) VALUES('Falkland Islands');
INSERT INTO countries(name) VALUES('Faroe Islands');
INSERT INTO countries(name) VALUES('Fiji');
INSERT INTO countries(name) VALUES('Finland');
INSERT INTO countries(name) VALUES('France');
INSERT INTO countries(name) VALUES('France, Metropolitan');
INSERT INTO countries(name) VALUES('French Guiana ');
INSERT INTO countries(name) VALUES('French Polynesia');
INSERT INTO countries(name) VALUES('French Southern Territories');
INSERT INTO countries(name) VALUES('Gabon');
INSERT INTO countries(name) VALUES('Gambia');
INSERT INTO countries(name) VALUES('Georgia');
INSERT INTO countries(name) VALUES('Germany ');
INSERT INTO countries(name) VALUES('Ghana');
INSERT INTO countries(name) VALUES('Gibraltar');
INSERT INTO countries(name) VALUES('Greece');
INSERT INTO countries(name) VALUES('Greenland');
INSERT INTO countries(name) VALUES('Grenada');
INSERT INTO countries(name) VALUES('Guadeloupe');
INSERT INTO countries(name) VALUES('Guam');
INSERT INTO countries(name) VALUES('Guatemala');
INSERT INTO countries(name) VALUES('Guinea');
INSERT INTO countries(name) VALUES('Guinea-Bissau');
INSERT INTO countries(name) VALUES('Guyana');
INSERT INTO countries(name) VALUES('Haiti');
INSERT INTO countries(name) VALUES('Heard and Mc Donald Islands');
INSERT INTO countries(name) VALUES('Honduras');
INSERT INTO countries(name) VALUES('Hong Kong');
INSERT INTO countries(name) VALUES('Hungary');
INSERT INTO countries(name) VALUES('Iceland');
INSERT INTO countries(name) VALUES('India');
INSERT INTO countries(name) VALUES('Indonesia');
INSERT INTO countries(name) VALUES('Iran');
INSERT INTO countries(name) VALUES('Iraq ');
INSERT INTO countries(name) VALUES('Ireland');
INSERT INTO countries(name) VALUES('Israel');
INSERT INTO countries(name) VALUES('Italy');
INSERT INTO countries(name) VALUES('Jamaica');
INSERT INTO countries(name) VALUES('Japan');
INSERT INTO countries(name) VALUES('Jordan');
INSERT INTO countries(name) VALUES('Kazakhstan');
INSERT INTO countries(name) VALUES('Kenya');
INSERT INTO countries(name) VALUES('Kiribati ');
INSERT INTO countries(name) VALUES('Korea, Republic of (south)');
INSERT INTO countries(name) VALUES('Kosovo');
INSERT INTO countries(name) VALUES('Kuwait');
INSERT INTO countries(name) VALUES('Kyrgyzstan');
INSERT INTO countries(name) VALUES('Laos (Lao Peoples Democratic Republic)');
INSERT INTO countries(name) VALUES('Latvia');
INSERT INTO countries(name) VALUES('Lebanon');
INSERT INTO countries(name) VALUES('Lesotho');
INSERT INTO countries(name) VALUES('Liberia');
INSERT INTO countries(name) VALUES('Libyan Arab Jamahiriya');
INSERT INTO countries(name) VALUES('Liechtenstein');
INSERT INTO countries(name) VALUES('Lithuania');
INSERT INTO countries(name) VALUES('Luxembourg');
INSERT INTO countries(name) VALUES('Macau');
INSERT INTO countries(name) VALUES('Macedonia');
INSERT INTO countries(name) VALUES('Madagascar');
INSERT INTO countries(name) VALUES('Malawi');
INSERT INTO countries(name) VALUES('Malaysia');
INSERT INTO countries(name) VALUES('Maldives');
INSERT INTO countries(name) VALUES('Mali');
INSERT INTO countries(name) VALUES('Malta');
INSERT INTO countries(name) VALUES('Marshall Islands');
INSERT INTO countries(name) VALUES('Martinique ');
INSERT INTO countries(name) VALUES('Mauritania');
INSERT INTO countries(name) VALUES('Mauritius');
INSERT INTO countries(name) VALUES('Mayotte');
INSERT INTO countries(name) VALUES('Mexico');
INSERT INTO countries(name) VALUES('Micronesia');
INSERT INTO countries(name) VALUES('Moldova');
INSERT INTO countries(name) VALUES('Monaco');
INSERT INTO countries(name) VALUES('Mongolia');
INSERT INTO countries(name) VALUES('Montenegro');
INSERT INTO countries(name) VALUES('Montserrat');
INSERT INTO countries(name) VALUES('Morocco');
INSERT INTO countries(name) VALUES('Mozambique');
INSERT INTO countries(name) VALUES('Myanmar');
INSERT INTO countries(name) VALUES('Namibia');
INSERT INTO countries(name) VALUES('Nauru');
INSERT INTO countries(name) VALUES('Nepal');
INSERT INTO countries(name) VALUES('Netherlands');
INSERT INTO countries(name) VALUES('Netherlands Antilles');
INSERT INTO countries(name) VALUES('New Caledonia');
INSERT INTO countries(name) VALUES('New Zealand');
INSERT INTO countries(name) VALUES('Nicaragua');
INSERT INTO countries(name) VALUES('Niger');
INSERT INTO countries(name) VALUES('Nigeria');
INSERT INTO countries(name) VALUES('Niue');
INSERT INTO countries(name) VALUES('Norfolk Island');
INSERT INTO countries(name) VALUES('Northern Mariana Islands');
INSERT INTO countries(name) VALUES('Norway');
INSERT INTO countries(name) VALUES('Oman');
INSERT INTO countries(name) VALUES('Pakistan');
INSERT INTO countries(name) VALUES('Palau');
INSERT INTO countries(name) VALUES('Palestine');
INSERT INTO countries(name) VALUES('Panama');
INSERT INTO countries(name) VALUES('Papua New Guinea');
INSERT INTO countries(name) VALUES('Paraguay ');
INSERT INTO countries(name) VALUES('Peru');
INSERT INTO countries(name) VALUES('Philippines');
INSERT INTO countries(name) VALUES('Pitcairn');
INSERT INTO countries(name) VALUES('Poland');
INSERT INTO countries(name) VALUES('Portugal');
INSERT INTO countries(name) VALUES('Puerto Rico');
INSERT INTO countries(name) VALUES('Qatar');
INSERT INTO countries(name) VALUES('Reunion');
INSERT INTO countries(name) VALUES('Romania');
INSERT INTO countries(name) VALUES('Russian Federation');
INSERT INTO countries(name) VALUES('Rwanda');
INSERT INTO countries(name) VALUES('Saint Helena (UK)');
INSERT INTO countries(name) VALUES('Saint Kitts and Nevis');
INSERT INTO countries(name) VALUES('Saint Lucia');
INSERT INTO countries(name) VALUES('Saint Maarten');
INSERT INTO countries(name) VALUES('Saint Pierre and Miquelon (FR)');
INSERT INTO countries(name) VALUES('Saint Thomas');
INSERT INTO countries(name) VALUES('Saint Vincent and the Grenadines');
INSERT INTO countries(name) VALUES('Samoa');
INSERT INTO countries(name) VALUES('San Marino');
INSERT INTO countries(name) VALUES('Sao Tome and Principe');
INSERT INTO countries(name) VALUES('Saudi Arabia');
INSERT INTO countries(name) VALUES('Senegal');
INSERT INTO countries(name) VALUES('Serbia');
INSERT INTO countries(name) VALUES('Serbia + Montenegro (old)');
INSERT INTO countries(name) VALUES('Seychelles');
INSERT INTO countries(name) VALUES('Sierra Leone');
INSERT INTO countries(name) VALUES('Singapore');
INSERT INTO countries(name) VALUES('Slovakia');
INSERT INTO countries(name) VALUES('Slovenia');
INSERT INTO countries(name) VALUES('Solomon Islands');
INSERT INTO countries(name) VALUES('Somalia');
INSERT INTO countries(name) VALUES('South Africa');
INSERT INTO countries(name) VALUES('South Georgia and the South Sandwich Islands');
INSERT INTO countries(name) VALUES('Spain');
INSERT INTO countries(name) VALUES('Sri Lanka');
INSERT INTO countries(name) VALUES('Sudan');
INSERT INTO countries(name) VALUES('Suriname');
INSERT INTO countries(name) VALUES('Svalbard and Jan Mayen Islands');
INSERT INTO countries(name) VALUES('Swaziland');
INSERT INTO countries(name) VALUES('Sweden');
INSERT INTO countries(name) VALUES('Switzerland');
INSERT INTO countries(name) VALUES('Syrian Arab Republic');
INSERT INTO countries(name) VALUES('Taiwan');
INSERT INTO countries(name) VALUES('Tajikistan');
INSERT INTO countries(name) VALUES('Tanzania');
INSERT INTO countries(name) VALUES('Thailand');
INSERT INTO countries(name) VALUES('Timor-Leste');
INSERT INTO countries(name) VALUES('Togo');
INSERT INTO countries(name) VALUES('Tokelau');
INSERT INTO countries(name) VALUES('Tonga');
INSERT INTO countries(name) VALUES('Trinidad and Tobago');
INSERT INTO countries(name) VALUES('Tunisia');
INSERT INTO countries(name) VALUES('Turkey');
INSERT INTO countries(name) VALUES('Turkmenistan');
INSERT INTO countries(name) VALUES('Turks and Caicos Islands');
INSERT INTO countries(name) VALUES('Tuvalu');
INSERT INTO countries(name) VALUES('Uganda');
INSERT INTO countries(name) VALUES('Ukraine');
INSERT INTO countries(name) VALUES('United Arab Emirates');
INSERT INTO countries(name) VALUES('United Kingdom');
INSERT INTO countries(name) VALUES('United States of America');
INSERT INTO countries(name) VALUES('Uruguay');
INSERT INTO countries(name) VALUES('Uzbekistan');
INSERT INTO countries(name) VALUES('Vanuatu');
INSERT INTO countries(name) VALUES('Vatican City State');
INSERT INTO countries(name) VALUES('Venezuela');
INSERT INTO countries(name) VALUES('Vietnam');
INSERT INTO countries(name) VALUES('Virgin Islands (British)');
INSERT INTO countries(name) VALUES('Virgin Islands (U.S.)');
INSERT INTO countries(name) VALUES('Wallis and Futuna Islands');
INSERT INTO countries(name) VALUES('Western Sahara');
INSERT INTO countries(name) VALUES('Yemen');
INSERT INTO countries(name) VALUES('Zaire');
INSERT INTO countries(name) VALUES('Zambia');
INSERT INTO countries(name) VALUES('Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `countries_id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FOREIGN KEY (`countries_id`) REFERENCES countries(`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `countries_id`, `email`, `password`) VALUES
(1, 'andrea', 5, 'andrea.ialenti@gmail.com', '12345'),
(2, 'francesco', 8, 'dsad@dsadasdjas.com', '12345'),
(3, 'mario', 9, 'dsad@ojuieroor.com', '12345');
