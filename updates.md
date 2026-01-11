29-12-2025
Veld isbn13 tooegevoegd aan boekentabel
Isbn13 toegevoegd aan voegboektoe1.js (isbn zoeken en toevoegen) en server.js.
Ook toegevoegd aan voegboektoe 2 en 3.
Zoeken op titel verbeterd.

onvolledige velden worden gevuld met een placeholder om ze toch te kunnen opslaan in de database: 

const boekData = {
        isbn13: isbn13 || "1111111111111",
        isbn10: isbn10 || "1111111111",
        titel: book.title || "Onbekend",
        auteur: book.authors?.join(", ") || "Onbekend",
        uitgeverij: book.publisher || "Onbekend",
        beschrijving: book.description || "Geen beschrijving beschikbaar",
        publicatiejaar: book.publishedDate || "Onbekend",
        taal: book.language || "Onbekend",
        paginas: book.pageCount || 0,
        afbeelding: book.imageLinks?.thumbnail ?? "./img/plaatje.jpg"
      };


NB, boekData wordt niet in alle drie de toevoegmogelijkheden consequent gehanteerd, heet ook wel eens gevondenBoek.

30-12-2025
cursor in isbn invulvak gezet door: 
<script> document.getElementById("isbnInput").focus(); </script> aan het html-bestand onderaan voor </body> in te voegen.

Zoekboekfunctie toegevoegd
server aangepast om niet alleen alles te kunnen ophalen, maar ook met een query  

31-12-2025
checkBestaat functie gemaakt, uitgeprobeerd en abstract gemaakt

overzicht aangepast

database opgeruimd

2-1-2026
probeer.html en .js gemaakt zoekt op isbn naar boek, checkt of het al in de database staat en voegt toe of hoogt aantal exemplaren op

ook zoiets geprobeerd met zoeken op titel, maar dat werkt nog niet goed.

3-1-2026
probeer >>>toevoegen, betere feedback 
Nieuwe manier van toevoegen gebouwd met minder knoppen(alt_toevoegen), keuze maak ik later
todo UI/UX:
-focus op juiste plek
-invulveld op juiste momenten leegmaken

Boekenbeheer toegevoegd (bewerkboek):
-zoeken op isbn, titel of auteur
-bewerken van enkele velden
-verwijderen

Database uitgebreid met leners en uitleen

Begonnen met lenersbeheer, werkt nog niet

4-1-2026
Lenersbeheer verbeterd, werkt nu met automatische increase van id i.p.v. opgeven van magisternummer

5-1-2026
Diverse verbeteringen, database ge-exporteerd

6-1-2026
Uitleenbeheer begonnen op basis van lenersbeheer en zoekboek

7-1-2026
Uitleenbeheer aangepast, slaat nu uitgeleende boeken op in de tabel uitleen.
POst en GET werken (get moet nog in de frontend gezetgebouwd worden, nu alleen alleen zichtbaar via http://localhost:3000/uitleen) 
mogelijke fout van dubbel uitlenen moet ook nog afgevangen worden

8-1-2026
todo in apart bestand
lenersbeheer aangepast (overbodig veld verwijderd)
index aangepast
oude versie van bestanden opgeruimd in map

9-1-2026
overzicht geleende boeken gemaakt (met in de backend query op meerdere tabellen, die ik al eerder gemaakt had en geprobeerd in phpmyadmin)
lenersbeheer hersteld en verwijderknop voorlopig uitgezet (vanwege openstaande uitleen en als ik geschiedenis zou willen)

begonnen met zoeken op uitgeleende boeken om ze in te kunnen nemen, maar die moet echt anders, plan:
  zoek gebruiker, haal gebruikers id op, doe query in uitleen op id en haal data op(zie overzicht geleende boeken), knop indrukken verandert actief van 1 in 0, update van uitleen.

in 3 stappen gedaan, stap 2 en 3 moeten nog samengevoegd

11-1-26
Query verbeterd in de backend stap 2 en 3 nu gewoon 1 stap
boek inleveren werkt.
