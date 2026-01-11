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