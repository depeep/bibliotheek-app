-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 05 jan 2026 om 20:12
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bibliotheek`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `boeken`
--

CREATE TABLE `boeken` (
  `id` int(11) NOT NULL COMMENT 'id van het exemplaar',
  `isbn13` varchar(13) NOT NULL COMMENT 'isbn13 nummer',
  `isbn10` varchar(10) NOT NULL COMMENT 'isbn10 nummer',
  `titel` varchar(255) NOT NULL COMMENT 'titel van het boek',
  `auteur` varchar(255) NOT NULL COMMENT 'naam van de auteur',
  `uitgeverij` varchar(255) NOT NULL COMMENT 'uitgeverij',
  `beschrijving` text NOT NULL COMMENT 'beschrijving',
  `publicatiejaar` year(4) NOT NULL,
  `afbeelding` text NOT NULL COMMENT 'url naar plaatje',
  `taal` varchar(10) NOT NULL,
  `paginas` int(11) NOT NULL,
  `exemplaren` int(11) NOT NULL DEFAULT 1 COMMENT 'Aantal exemplaren in bezit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `boeken`
--

INSERT INTO `boeken` (`id`, `isbn13`, `isbn10`, `titel`, `auteur`, `uitgeverij`, `beschrijving`, `publicatiejaar`, `afbeelding`, `taal`, `paginas`, `exemplaren`) VALUES
(173, '9781617298677', '1617298670', 'The Programmer\'s Brain', 'Felienne Hermans', 'Simon and Schuster', 'The Programmer\'s Brain explores the way your brain works when it\'s thinking about code. In it, you\'ll master practical ways to apply these cognitive principles to your daily programming life. You\'ll improve your code comprehension by turning confusion into a learning tool, and pick up awesome techniques for reading code and quickly memorizing syntax. This practical guide includes tips for creating your own flashcards and study resources that can be applied to any new language you want to master. By the time you\'re done, you\'ll not only be better at teaching yourself--you\'ll be an expert at bringing new colleagues and junior programmers up to speed.', '2021', 'http://books.google.com/books/content?id=9C89EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 254, 4),
(176, '9789043016735', '904301673X', 'Basisboek wiskunde', 'Jan van de Craats, Rob Bosch (leermiddelen.)', 'Pearson Education', '- Getallen - Algebra - Getallenrijen - Vergelijkingen - Meetkunde - Functies - Calculus - Achtergronden - Antwoorden - Formuleoverzicht - Trefwoordenregister', '2015', 'http://books.google.com/books/content?id=4DJg_wakzREC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 340, 4),
(179, '9780743244282', '0743244281', 'Barry Trotter and the Unauthorized Parody', 'Michael Gerber', 'Touchstone', 'Parody of J.K. Rowling\'s Harry Potter series.', '2002', 'http://books.google.com/books/content?id=eUdNN2b5uIsC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'en', 180, 2),
(182, '9781781103494', '1781103496', 'Harry Potter en de Vuurbeker', 'J.K. Rowling', 'Pottermore Publishing', 'Harry kan niet wachten tot hij terug mag naar Zweinsteins Hogeschool voor Hekserij en Hocus-Pocus, om aan zijn vierde schooljaar te beginnen. Maar voor het zover is, wordt hij door de familie Wemel op spectaculaire wijze bij de Duffelingen opgehaald, om mee te gaan naar de finale van het WK Zwerkbal! Harry weet dan nog niet dat er dat jaar op Zweinstein een nog groter en spannender evenement zal plaatsvinden. Ondanks alle opwinding en magische gebeurtenissen, probeert hij zich toch op zijn lessen te concentreren. Ondertussen zijn er allerlei tekenen die er op wijzen dat Voldemort, met behulp van Duistere tovenaars, weer aan kracht begint te winnen. De angst dat Hij Die Niet Genoemd Mag Worden opnieuw zal toeslaan, wordt steeds groter...', '2015', 'http://books.google.com/books/content?id=OTYQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 761, 1),
(183, '9781781103470', '178110347X', 'Harry Potter en de Geheime Kamer', 'J.K. Rowling', 'Pottermore Publishing', 'Na een verschrikkelijke vakantie bij zijn gemene oom en tante gaat Harry Potter naar de tweede klas van Zweinsteins Hogeschool voor Hekserij en Hocus Pocus. Maar alleen al om daar te komen blijkt een ware heksentoer te zijn, waarbij een vliegende auto Harry en zijn vriend Ron uitkomst biedt. Na alle avonturen van het vorig schooljaar denkt Harry zich rustig aan zijn lessen - Toverdranken, Transfiguratie, Bezweringen, Verweer tegen de Zwarte Kunsten - en zijn favoriete sport Zwerkbal te kunnen wijden. Maar dan hoort hij een mysterieuze stem, vinden er aanslagen plaats en ontdekt hij een wel heel bijzonder dagboek...', '2015', 'http://books.google.com/books/content?id=8jYQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 358, 1),
(184, '9789061697015', '9061697018', 'Harry Potter en de Orde van de Feniks', 'Joanne K. Rowling', 'Onbekend', 'Harry Potter ontdekt in zijn vijfde jaar op de Hogeschool voor Hekserij en Hocus Pocus dat de leerlingen steeds minder mogen en zelfs worden bespioneerd, maar hij wordt ook verliefd.', '2003', 'http://books.google.com/books/content?id=GMXKGAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'nl', 668, 1),
(185, '9781633439054', '1633439054', 'The Creative Programmer', 'Wouter Groeneveld', 'Simon and Schuster', 'The Creative Programmer applies stories, examples, and ground-breaking research around the processes and habits of successful creative individuals, helping you discover how you can build creativity into your programming practice. This fascinating new book teaches practical techniques that apply those principles to software development.', '2023', 'http://books.google.com/books/content?id=7tm8EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 230, 3),
(190, '9789090301068', '9090301062', 'Game didactiek', 'Martijn Cornelis Koops', 'Onbekend', 'De auteur is natuurkundelerarenopleider aan Hogeschool Utrecht en past gamification en educatieve games veelvuldig in zijn lessen toe. Zijn streven is voor elk vak een ander spel te ontwerpen en zo zijn studenten bekend te maken met deze krachtige werkvorm.', '2017', './img/plaatje.jpg', 'nl', 172, 4),
(191, '9781394348121', '1394348126', 'Hacking For Dummies', 'Kevin Beaver', 'John Wiley & Sons', 'Think like a hacker to protect your sensitive information To safeguard your private data from prying eyes, it helps to understand how hackers do what they do. Hacking For Dummies gives you the tools you need to step into a hacker\'s shoes and discover the best strategies to secure your data. You won\'t learn how to steal your neighbors\' Wi-Fi, but you will gain the skills to keep nosy hackers out of your systems and applications. With clear, jargon-free explanations, you\'ll learn to recognize cyberthreats and keep your information safe. This updated edition includes new content on AI, the Internet of Things (IoT), and the security implications of hybrid work. Understand the tools hackers use to steal sensitive data from individuals and businesses Discover methods of protecting your information—including improving your security, recognizing phishing scams, and more Assess your current network and cloud configurations from a hacker\'s perspective using proven vulnerability and penetration testing techniques Defend against AI-generated scams, lost devices, and other common threats Hacking For Dummies is for anyone looking to protect their devices from hacking—at home, at the office, or anywhere in-between.', '2025', 'http://books.google.com/books/content?id=VJ2BEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 423, 10),
(192, '9781781103517', '1781103518', 'Harry Potter en de Halfbloed Prins', 'J.K. Rowling', 'Pottermore Publishing', 'Het land wordt geteisterd door vreemde rampen en aanslagen en hoewel het hartje zomer is hangt er een hardnekkige, onheilspellende mist. In de Ligusterlaan zit Harry Potter ’s avonds laat ongeduldig op de komst van professor Perkamentus te wachten. Wat kan er er zo belangrijk zijn dat Perkamentus hem bij de Duffelingen op komt zoeken en dat niet wachten kan tot Harry’s terugkeer naar Zweinstein? Zou het iets te maken hebben met de oude profetie die Harry aan het eind van zijn vijfde schooljaar gehoord heeft? Harry’s zesde jaar op Zweinstein begint ongebruikelijk, als Voldemort opnieuw aan kracht wint en de werelden van Dreuzels en tovenaars zich steeds meer met elkaar vermengen...', '2015', 'http://books.google.com/books/content?id=iTgQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 672, 2),
(195, '9781119906834', '1119906830', 'JavaScript All-in-One For Dummies', 'Chris Minnick', 'John Wiley & Sons', 'A developer’s resource to learning one of the most-used scripting languages JavaScript All-in-One For Dummies saves you shelf space by offering a complete introduction to JavaScript and how it’s used in the real world. This book serves up JavaScript coding basics before diving into the tools, libraries, frameworks, and runtime environments new and experienced coders need to know. Start by learning the basics of JavaScript and progress through the techniques and tools used by professional JavaScript developers, even if you’ve never written code before. You also get the details of today’s hottest libraries and frameworks—React.js, Vue.js, Svelte, and Node.js. Learn the basics of web and application development with the JavaScript language Grasp the similarities and differences between React.js, Vue.js, and Svelte Discover how to write server-side JavaScript and how to access databases with Node.js Gain a highly marketable skill, with one of the most popular coding languages Launch or further your career as a coder with easy-to-follow instruction This is the go-to Dummies guide for future and current coders who need an all-inclusive guide JavaScript. This is the go-to Dummies guide for future and current coders who need an all-inclusive guide to the world of JavaScript.', '2023', 'http://books.google.com/books/content?id=Co61EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 823, 1),
(196, '9789045041537', '9045041537', 'Wat loopt daar?', 'Midas Dekkers', 'Onbekend', 'We spreken onbekommerd van tarwerassen, tulpenrassen, aardappelrassen, honden, tijger- en kippenrassen maar waar men over menselijke rassen spreekt, stuit men op een probleem. Omdat het ene ras zich beter waant dan het andere. Maar racistisch denken is een sociaal-cultureel, historisch gegeven. Met bestaande biologische verschillen heeft dat volgens Dekkers niks te maken.0Hij verkent het begrip ras zuiver biologisch: net als andere dieren kan de menselijke soort in rassen worden onderverdeeld. In \'Wat loopt daar?\' (de titel is ontleend aan de beroemde eerste vogelgids \'Wat vliegt daar?\') beschrijft en analyseert Midas Dekkers de mensen in al hun gedaanten zoals alleen hij dat kan: met verwondering, openheid, eenvoudig, gedetailleerd en vooral met liefde. Met de hem eigen humor en flair deelt hij zijn fenomenale kennis van de biologie. In tien wervelende hoofdstukken gaat hij in op de evolutie, natuurlijke selectie, de menselijke neiging tot categoriseren, op Darwin en de door hem bewonderde eerste grote taxonomen Linnaeus en Blumenbach.0Dekkers viert de variatie, heeft een goed oog voor het absurde en is niet bang voor het ongerijmde. Evenals in zijn andere boeken zijn de vele schitterende illustraties integraal onderdeel van het betoog.', '2021', './img/plaatje.jpg', 'nl', 368, 1),
(197, '9781394164684', '1394164688', 'HTML, CSS, & JavaScript All-in-One For Dummies', 'Paul McFedries', 'John Wiley & Sons', 'A thorough and helpful reference for aspiring website builders Looking to start an exciting new career in front-end web building and design? Or maybe you just want to develop a new skill and create websites for fun. Whatever your reasons, it’s never been easier to start learning how to build websites from scratch than with help from HTML, CSS, & JavaScript All-in-One For Dummies. This book has the essentials you need to wrap your head around the key ingredients of website design and creation. You’ll learn to build attractive, useful, and easy-to-navigate websites by combining HTML, CSS, and JavaScript into fun and practical creations. Using the 6 books compiled within this comprehensive collection, you’ll discover how to make static and dynamic websites, complete with intuitive layouts and cool animations. The book also includes: Incorporate the latest approaches to HTML, CSS, and JavaScript, including those involving new markup, page styles, interactivity, and more Step-by-step instructions for new site creators explaining the very basics of page layouts and animations Easy-to-follow advice for adjusting page color and background, adding widgets to a site, and getting rid of all the bugs that affect site performance Bonus 6th book available at https://www.wiley.com/en-us/HTML%2C+CSS%2C+%26amp%3B+JavaScript+All+in+One+For+Dummies-p-9781394164721. Web development is a fun, interesting, and challenging skill that can lead to a lucrative career (if you’re so inclined). And with the right help, almost anyone can learn to create engaging websites from scratch. So, grab a copy of HTML, CSS, & JavaScript All-in-One For Dummies and you’ll be designing and building before you know it!', '2023', 'http://books.google.com/books/content?id=m-nIEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 855, 2),
(198, '9781394242290', '1394242298', 'SQL All-in-One For Dummies', 'Allen G. Taylor, Richard Blum', 'John Wiley & Sons', 'The most thorough SQL reference, now updated for SQL:2023 SQL All-in-One For Dummies has everything you need to get started with the SQL programming language, and then to level up your skill with advanced applications. This relational database coding language is one of the most used languages in professional software development. And, as it becomes ever more important to take control of data, there’s no end in sight to the need for SQL know-how. You can take your career to the next level with this guide to creating databases, accessing and editing data, protecting data from corruption, and integrating SQL with other languages in a programming environment. Become a SQL guru and turn the page on the next chapter of your coding career. Get 7 mini-books in one, covering basic SQL, database development, and advanced SQL concepts Read clear explanations of SQL code and learn to write complex queries Discover how to apply SQL in real-world situations to gain control over large datasets Enjoy a thorough reference to common tasks and issues in SQL development This Dummies All-in-One guide is for all SQL users—from beginners to more experienced programmers. Find the info and the examples you need to reach the next stage in your SQL journey.', '2024', 'http://books.google.com/books/content?id=5x_7EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'en', 807, 1),
(199, '9789023478409', '9023478401', 'De waarheid over de zaak Harry Quebert', 'Joël Dicker', 'Bezige Bij b.v., Uitgeverij De', 'New York, voorjaar 2008. De jonge auteur Marcus Goldman lijdt aan een writers block, en dat terwijl de deadline van zijn uitgever nadert. Dan wordt in de tuin van zijn mentor, sterauteur Harry Quebert, het lichaam gevonden van Nola Kellergan, die ruim dertig jaar eerder op vijftienjarige leeftijd spoorloos is verdwenen. Op Nolas lichaam ligt het manuscript van de roman die Quebert zijn doorbraak naar het grote publiek heeft bezorgd. Harry Quebert is onmiddellijk hoofdverdachte en zijn beroemde roman komt in opspraak. Overtuigd van de onschuld van zijn grote voorbeeld vertrekt Marcus naar Harrys huis in New Hampshire om de werkelijke toedracht rond de dood van Nola te achterhalen. Maar de waarheid blijkt veel gecompliceerder dan hij dacht. In De waarheid over de zaak Harry Quebert verbindt Joël Dicker op indrukwekkende wijze een intrigerende moordzaak met een gevoelig geschreven verhaal over schrijverschap, onzekerheid, ambitie, vriendschap en liefde.', '2014', 'http://books.google.com/books/content?id=zqd1AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 640, 1),
(200, '9789026135170', '9026135173', 'Sjakie en de chocoladefabriek', 'Roald Dahl', 'Uitgeverij De Fontein', 'Als Sjakie een Gouden Toegangskaart vindt in een reep chocola, gaat zijn diepste wens in vervulling: hij krijgt een rondleiding door de geheimzinnige chocoladefabriek van meneer Willie Wonka. 100ste druk van het beste kinderboek aller tijden! Als Sjakie een Gouden Toegangskaart vindt in een reep chocola, gaat zijn diepste wens in vervulling: hij krijgt een rondleiding door de geheimzinnige chocoladefabriek van meneer Willie Wonka, de ongelofelijkste, geweldigste en verbazingwekkendste chocoladefabrikant ooit. En wie zou niet willen rondwandelen op de plek waar ze opstijglimonade met prik, holle-kiezen-vullende karamels, aardbeiensap-waterpistolen of aflikbaar behang voor kinderkamers maken? Maar in de fabriek schuilen ook grote gevaren. Bijvoorbeeld voor Caspar Slok, die door een rivier van hete chocolade wordt meegesleurd...', '2016', 'http://books.google.com/books/content?id=JOZyCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 138, 1),
(201, '9789026135200', '9026135203', 'Sjakie en de grote glazen lift', 'Roald Dahl', 'Uitgeverij De Fontein', 'Samen met zijn ouders en grootouders vliegt Sjakie boven de stad, op weg naar de chocoladefabriek waarvan hij de nieuwe eigenaar is. Maar niets gaat volgens plan. Ze gaan steeds sneller en hoger! Sjakie en de grote glazen lift is de opvolger van Sjakie en de chocoladefabriek. Een fantastisch kinderboek van bestsellerauteur Roald Dahl, met prachtige tekeningen van bekroond illustrator Quentin Blake. Dit e-book kun je op je smartphone, tablet én op je e-reader lezen. Dit e-book is geschikt voor zowel iOS- als Android-besturingssystemen. Dit boek begint waar Sjakie en de chocoladefabriek ophoudt: in Willie Wonka’s grote glazen lift. Samen met zijn ouders en grootouders – en meneer Wonka – vliegt Sjakie boven de stad, op weg naar de chocoladefabriek waarvan hij de nieuwe eigenaar is. Maar niets gaat volgens plan. Door het geruzie van opoe Jakoba drukt Sjakie te laat op de groene knop. De lift schiet omhoog, sneller en sneller, hoger en hoger! ‘Zijn we te ver gegaan?’ vroeg Sjakie. ‘Te vér?’ riep meneer Wonka. ‘En of we te ver zijn! Zal ik jullie eens wat vertellen, jongens? We zijn in de ruimte, we vliegen in een baan om de aarde.’ Maar ze zijn niet de enigen... vlakbij vliegt een Amerikaans super-ruimtehotel. Wat kan Sjakie doen om dit avontuur tot een goed einde te brengen? ‘Roald Dahl is de beste kinderboekenschrijver ter wereld.’ – VPRO-gids', '2016', 'http://books.google.com/books/content?id=suRyCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 134, 1),
(202, '9781716787317', '1716787319', 'War and Peace', 'Leo Tolstoy, Daniel H Shubin', 'Onbekend', 'This volume is a new translation of Leo Tolstoy\'s War and Peace, for the American reader. For War and Peace to have the recognition of the greatest historical-fiction novel ever composed is an understatement, as it does not include its aspect of the philosophy of history provided by Tolstoy in regard to the conflicts and wars between France and Russia, and Napoleon\'s invasion of Russia and retreat. It is equally entertaining as it delves into Russian traditions, home life, adventure, love, ambition romantic manipulation, and the responsibility of parents and landlords. the aristocracy and the peasantry. In addition is the incorporation of Tolstoy\'s Christian humanist philosophy by using several characters of the novel as his mouthpiece. Individual agonies of the difficulty of dealing with life\'s issues in so many aspects is included in almost each chapter. Likewise there is hardly an event or scenario that does not deal with some facet of personal success or happiness, and death and its impact on others, the failure of relationships, and hope that provides perseverance for the future. Especially noticeable is Tolstoy\'s ability to allow some random event to affect lives and situations.', '2020', 'http://books.google.com/books/content?id=ZZ7JzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'en', 800, 1),
(203, '9781781103326', '1781103321', 'Harry Potter en de Steen der Wijzen', 'J.K. Rowling', 'Pottermore Publishing', 'Met een speciale trein die vertrekt van perron 93⁄4 belandt Harry Potter op Zweinsteins Hogeschool voor Hekserij en Hocus Pocus, waar hij alles leert over bezemstelen, toverdranken en monsters. En uiteindelijk moet hij het opnemen tegen zijn aartsvijand Voldemort, een levensgevaarlijke tovenaar.', '2015', 'http://books.google.com/books/content?id=gDUQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'nl', 318, 1),
(204, '9789001893804', '9001893805', 'Binas havo/vwo', 'G. Verkerk', 'Onbekend', 'Geen beschrijving beschikbaar', '2004', './img/plaatje.jpg', 'nl', 100, 1),
(205, '9789001800697', '9001800696', 'Binas vmbo-kgt', 'Jan Theo Boer, Nederlandse Vereniging voor het Onderwijs in de Natuurwetenschappen', 'Onbekend', 'Geen beschrijving beschikbaar', '2010', './img/plaatje.jpg', 'nl', 45, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leners`
--

CREATE TABLE `leners` (
  `id` int(11) NOT NULL,
  `naam` text NOT NULL,
  `actief` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leners`
--

INSERT INTO `leners` (`id`, `naam`, `actief`) VALUES
(1, 'Jan Jansen', 1),
(2, 'Snerben van der Nerf', 1),
(3, 'Jacob Jacobs', 1),
(4, 'Piet Pietersen', 1),
(6, 'Snerbelien van der Snerf', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `uitleen`
--

CREATE TABLE `uitleen` (
  `transactieid` int(11) NOT NULL COMMENT 'id van het uitlenen',
  `boekid` int(11) NOT NULL COMMENT 'uit tabel boeken',
  `lenersid` int(11) NOT NULL COMMENT 'uit tabel leners',
  `datum` date NOT NULL COMMENT 'uitleendatum',
  `actief` bit(1) NOT NULL COMMENT 'lening is actief als boek nog niet terug is'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `uitleen`
--

INSERT INTO `uitleen` (`transactieid`, `boekid`, `lenersid`, `datum`, `actief`) VALUES
(1, 192, 1001, '2026-01-03', b'1'),
(2, 197, 1002, '2025-12-12', b'1'),
(3, 197, 1001, '2026-01-03', b'1');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `boeken`
--
ALTER TABLE `boeken`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `leners`
--
ALTER TABLE `leners`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `uitleen`
--
ALTER TABLE `uitleen`
  ADD PRIMARY KEY (`transactieid`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `boeken`
--
ALTER TABLE `boeken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id van het exemplaar', AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT voor een tabel `leners`
--
ALTER TABLE `leners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `uitleen`
--
ALTER TABLE `uitleen`
  MODIFY `transactieid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id van het uitlenen', AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
