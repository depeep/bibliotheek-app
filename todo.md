Index:
landingspagina aanpassen

Overzicht (weglaten in def versie):
-gebruiken als basis voor bijvoorbeeld inventarislijst of papieren catalogus.

lenersbeheer:
-invoerveld lener zoeken weer leegmaken na zoekactie
-veld "actief" verbergen
V id invoerveld (nu verborgen) vervangen door een variabele voor het doorgeven van een wiijziging aan de back-end

voeg toe op isbn
-knop toevoegen/extra exemplaar onder invoervak zetten
(dichter bij feedback)
-of vervangen door alternatief (zonder zoekknop)

voeg toe op titel
-hier moet nog afgehandeld worden dat als boek al aanwezig is, alleen exemplaren wordt opgehoogd

voeg boek toe telefoon:
-hier moet nog afgehandeld worden dat als boek al aanwezig is, alleen exemplaren wordt opgehoogd
-Voorlopig weglaten, werkt op telefoon alleen bij https

bewerkboek
-schermindeling misschien aanpassen?

Zoek een boek (weg in definitieve versie/nice to have in dit stadium):
-knop toevoegen voor uitgebreide informatie (die staat immers niet voor niks in de database)
-eventueel functionaliteit toevoegen voor favorieten of verlanglijstje >>voor leners als ze ingelogd zijn >> extra tabel in DB zetten

Testpagina (verwijderen in definitieve versie ):
gebruiken om 
handmatig gegevens van een boek in te voeren of aan te passen in de database (bijvoorbeeld voor boeken die niet bij google gevonden worden of waar data ontbreken)

Probeer 2 en probeer 3(weglaten in def versie)
eventueel als basis voor wat anders gebruiken

Uitleenbeheer:>>hernoemd naar uitlenen
-schermindeling aanpassen?
-velden weer leegmaken op juiste momenten
-mogelijke fout van dubbel uitlenen moet  nog afgevangen worden
-Back end /Server
 V   POst en GET werken (get moet nog in de frontend gebouwd worden, nu alleen alleen zichtbaar via http://localhost:3000/uitleen) 

Toe te voegen noodzakelijke functionaliteit:

V Boeken terugbrengen (zoek op lener > overzicht geleend > knop zet actief(=uitgeleend) op 0)
V Geleende boeken per lener

Nice to have functionaliteit/optioneel/latere versies:
-overzicht uitgeleende boeken (eventueel vanaf een bepaalde datum)
-voorraad overzicht (exemplaren - aantal uitgeleend) >> eventueel voor leners beschikbaar maken
-leners functionaliteit zoals boeken zoeken in de eigen bibliotheek
-reserverings systeem
-Leners per uitgeleend boek



Noodzakelijke beveiliging:
-Login bibliothecaris regelen
-SQL-injecties tegengaan, bijvoorbeeld door doorgegeven data van de frontend verplicht in een string te gieten in de querie in de backend.
-Rechten zetten?

Overzichtelijkheid/onderhoudbaarheid
-mapstructuur doorvoeren

Server.js 
-code opruimen en gebruik van variabelen (bijvoorbeeld om apiURL's in de endpoints te beschrijven) consistent maken

Front end:
minder scripts door samenvoegen?
naamgeving bestanden
