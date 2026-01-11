
Indien nodig node en xampp installeren.
Apache en mySQL starten in xampp

In xampp in mySQL een database aanmaken met de naam "bibliotheek"
In xamp het bestand "bibliotheek.sql" uit de map database_backups importeren

In xampp\htdocs een map "bibliotheek-app" maken

Installeer express mysql2 en cors  m.b.v. de command prompt vanuit de map xampp\htdocs\bibliotheek-app :
"npm install express mysql2 cors" 
(of het bestand node_modules.zip uitpakken in de map).

pas in server.js het wachtwoord voor xampp aan naar jouw situatie

de server starten met "node server.js" (vanuit de map)

de site is te vinden op bijvoorbeeld 127.0.0.1/bibliotheek-app




