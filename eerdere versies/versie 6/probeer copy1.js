let gevondenBoek = null; 

document.getElementById("opslaanBtn").style.display = "none"; //knop nog niet laten zien


//boek opzoeken via google books API
async function searchBook() {
  const isbn = document.getElementById("isbnInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Bezig met zoeken...";

  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "Geen boek gevonden";
      document.getElementById("opslaanBtn").style.display = "none";
      return;
    }

    const book = data.items[0].volumeInfo;
    const isbn10 = book.industryIdentifiers.find(id => id.type === "ISBN_10")?.identifier;
    const isbn13 = book.industryIdentifiers.find(id => id.type === "ISBN_13")?.identifier;
    const inBezit = await checkBestaat1(isbn13);  // voor zoeken in eigen database met checkBestaat
    let aantalExemplaren = 1; //voor het invoeren van een nieuw boek
    document.getElementById("testuitvoer").innerHTML = `
    <p><b>ID:</b> ${inBezit.id ?? 'Niet gevonden'}</p>
    <p><b>Exemplaren:</b> ${inBezit.exemplaren}</p>
    <p><b>Isbn13:</b> ${inBezit.isbn13}</p>
  `;


    // Toon resultaat //nu met isbn13 en aantal al in bezit
    resultDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Exemplaren in bezit: </strong> <i> ${inBezit.exemplaren}</i></p>
      <p><strong>ISBN13:    </strong> ${isbn13}</p>
      <p><strong>ISBN10:    </strong> ${isbn10}</p>
      <p><strong>Auteurs: </strong> ${book.authors?.join(", ")}</p>
      <p><strong>Taal:    </Strong>${book.language}</p>
      <p><strong>Uitgever:</strong> ${book.publisher}</p>
      <p><strong>Jaar:    </strong> ${book.publishedDate}</p>
      <!--  <p><strong>Beschrijving:</strong> ${book.description}</p> -->
      ${book.imageLinks ? `<img src="${book.imageLinks.thumbnail}" />` : ""}
      `;

    //  Maak de knop zichtbaar
    document.getElementById("opslaanBtn").style.display = "inline-block";

      //check of het al in de database staat
    if (inBezit >0) {
      aantalExemplaren = (inBezit + 1); //ophogen om door te geven bij bijwerken
      feedbackDiv.innerHTML = `<h2>${aantalExemplaren}</h2>`;
      document.getElementById("opslaanBtn").innerText = "voeg een extra exemplaar toe";
      //functie om aantal exemplaren bij te werken

   } else {

      // data gereedmaken voor opslaan van het gevonden boek
      gevondenBoek = {
        isbn13: isbn13 || "1111111111111",
        isbn10: isbn10 || "1111111111",
        titel: book.title || "Onbekend",
        auteur: book.authors?.join(", ") || "Onbekend",
        uitgeverij: book.publisher || "Onbekend",
        beschrijving: book.description || "Geen beschrijving beschikbaar",
        publicatiejaar: book.publishedDate || "Onbekend",
        taal: book.language || "Onbekend",
        paginas: book.pageCount || 0,
        afbeelding: book.imageLinks?.thumbnail ?? "./img/plaatje.jpg",
        exemplaren: aantalExemplaren
      };

      voegBoekToe();
  } 

  }catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
  }
}

// gevonden boek opslaan
  function voegBoekToe(){

    document.getElementById("opslaanBtn").addEventListener("click", function () {
      if (!gevondenBoek) {
        document.getElementById("feedback").innerText = "Zoek eerst een boek op.";
        return;
      }

      fetch("http://localhost:3000/boeken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gevondenBoek)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          document.getElementById("feedback").innerText = "Boek succesvol opgeslagen!";
          document.getElementById("isbnInput").value = "";
          //document.getElementById("opslaanBtn").innerText = "Opgeslagen";


          fetchBoeken(); // lijst opnieuw laden
        } else {
          document.getElementById("feedback").innerText = "Fout bij opslaan.";
        }
      });
    });
  }
// Enter-toets activeren voor isbnInput
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });

/* oude functie
// kijken of een boek al in de database staat en aantal exemplaren teruggeven
async function checkBestaat(isbn) {
  try {
    const response = await fetch(`http://localhost:3000/boeken?isbn=${isbn}`);
    const data = await response.json();
    const boek = data[0];

    if (Array.isArray(data) && data.length > 0) {
      document.getElementById("testuitvoer").innerHTML = `
              <p><b>Exemplaren:</b>  ${boek.exemplaren}</p>
        `;
        let exemplarenTerug = parseInt(boek.exemplaren)
      return exemplarenTerug; 

    } else {
      let exemplarenTerug = 0;
      return exemplarenTerug;
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "Fout bij ophalen van gegevens";
    console.error(error);
  }
}
// aantal exemplaren bijwerken
*/
async function updateExemplaren(id, nieuwAantal) {
  try {
    const response = await fetch(`http://localhost:3000/boeken/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ exemplaren: nieuwAantal })
    });

    const result = await response.json();
    if (result.success) {
      console.log('Aantal exemplaren succesvol bijgewerkt!');
    } else {
      console.error('Fout bij bijwerken:', result.error);
    }
  } catch (error) {
    console.error('Netwerkfout:', error);
  }
}

// Voorbeeld aanroep:
//updateExemplaren('9781234567890', 5);


//checkbestaat1 gebruikt een ander endpoint om id en aantal op te halen
async function checkBestaat1(isbn) {
  try {
    const response = await fetch(`http://localhost:3000/boeken/getid?isbn13=${isbn}`);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const boek = data[0]; // Pak het eerste boek
      document.getElementById("testuitvoer").innerHTML = `
        <p><b>Exemplaren:</b> ${boek.exemplaren}</p>
      `;
      // Retourneer zowel exemplaren als id
      return {
        exemplaren: parseInt(boek.exemplaren) || 0,
        id: boek.id,
        isbn13: boek.isbn13
      };
    } else {
      return {
        exemplaren: 0,
        id: null,
        isbn13: null
      };
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "Fout bij ophalen van gegevens";
    console.error(error);
    return {
      exemplaren: 0,
      id: null
    };
  }
}

/*
// nieuwe functie voor het verhogen

async function verhoogExemplaren(isbn) {
  // Stap 1: Haal huidige exemplaren en id op
  const boekData = await checkBestaat(isbn);

  if (boekData.id) {
    const nieuwAantal = boekData.exemplaren + 1;

    // Stap 2: Voer PUT-request uit om exemplaren bij te werken
    try {
      const response = await fetch(`http://localhost:3000/boeken/${isbn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exemplaren: nieuwAantal })
      });

      // Controleer HTTP-status
      if (!response.ok) {
        throw new Error(`Serverfout: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Controleer API-response
      if (result.success) {
        console.log(`✅ Aantal exemplaren bijgewerkt naar ${nieuwAantal}`);
        document.getElementById("result").innerHTML = `Aantal exemplaren: ${nieuwAantal}`;
      } else {
        console.error('❌ Fout bij bijwerken:', result.error);
        document.getElementById("result").innerHTML = `Fout: ${result.error}`;
      }
    } catch (error) {
      console.error('❌ Netwerk- of serverfout:', error.message);
      document.getElementById("result").innerHTML = `Er is een fout opgetreden: ${error.message}`;
    }
  } else {
    console.warn('Boek niet gevonden.');
*/