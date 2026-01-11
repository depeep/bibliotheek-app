Uitgeprobeerd in xampp


SELECT boeken.titel, leners.naam, uitleen.datum
FROM boeken
INNER JOIN uitleen ON boeken.id = uitleen.boekid
INNER JOIN leners ON leners.id = uitleen.lenersid
WHERE uitleen.actief = 1;

geeft een boektitel terug met de lener en datum

andere queries
INSERT INTO `uitleen`(`transactieid`, `boekid`, `lenersid`, `datum`, `actief`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')

INSERT INTO uitleen (boekid, lenersid, datum, actief)
SELECT boeken.id, leners.id, DATE(NOW()), 1
FROM boeken
INNER JOIN leners ON leners.naam = 'JAN JANSEN'
WHERE boeken.isbn13 = '9781394164684';

Laat jan jansen het boek "html, css en javascript" lenen vandaag


UPDATE `uitleen` SET `transactieid`='[value-1]',`boekid`='[value-2]',`lenersid`='[value-3]',`datum`='[value-4]',`actief`='[value-5]' WHERE 1

UPDATE uitleen SET actief = 0 WHERE transactieid = 1
(kan ook met 'tjes)  >>> inleveren van een boek

DELETE FROM `uitleen` WHERE 0


Leners toevoegen:
INSERT INTO `leners`(`id`, `Naam`) VALUES ('[value-1]','[value-2]')


Boeken
INSERT INTO `boeken`(`id`, `isbn13`, `isbn10`, `titel`, `auteur`, `uitgeverij`, `beschrijving`, `publicatiejaar`, `afbeelding`, `taal`, `paginas`, `exemplaren`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]')

INSERT INTO `uitleen`(`transactieid`, `boekid`, `lenersid`, `datum`, `actief`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')