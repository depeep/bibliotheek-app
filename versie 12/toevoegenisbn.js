
let gevondenBoek = null;

// Knoppen standaard verbergen
document.getElementById("opslaanBtn").style.display = "none";
document.getElementById("ophoogBtn").style.display = "none";

// Event listeners één keer toevoegen
document.getElementById("opslaanBtn").addEventListener("click", voegBoekToe);
document.getElementById("ophoogBtn").addEventListener("click", ophoogExemplaren);

// Enter-toets activeren
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBook();
  }
});

// Zoek boek via Google Books API

async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  const resultDiv = document.getElementById("result");
  const feedbackDiv = document.getElementById("feedback");
  resultDiv.innerHTML = "Bezig met zoeken...";
  feedbackDiv.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "Geen boek gevonden";
      document.getElementById("opslaanBtn").style.display = "none";
      document.getElementById("ophoogBtn").style.display = "none";
      return;
    }

    const book = data.items[0].volumeInfo;
    const isbn10 = book.industryIdentifiers.find(id => id.type === "ISBN_10")?.identifier;
    const isbn13 = book.industryIdentifiers.find(id => id.type === "ISBN_13")?.identifier;

    const inBezit = await checkBestaat(isbn13);
    let aantalExemplaren = inBezit.exemplaren > 0 ? inBezit.exemplaren : 0;

    // Toon boekinfo
    resultDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Exemplaren in bezit:</strong> <i>${aantalExemplaren}</i></p>
      <p><strong>ISBN13:</strong> ${isbn13}</p>
      <p><strong>ISBN10:</strong> ${isbn10}</p>
      <p><strong>Auteurs:</strong> ${book.authors?.join(", ")}</p>
      <p><strong>Taal:</strong> ${book.language}</p>
      <p><strong>Uitgever:</strong> ${book.publisher}</p>
      <p><strong>Jaar:</strong> ${book.publishedDate}</p>
      ${book.imageLinks ? `<img src="${book.imageLinks.thumbnail}" />` : ""}
    `;

    // Knoppen tonen/verbergen
    if (inBezit.exemplaren > 0) {
      document.getElementById("opslaanBtn").style.display = "none";
      document.getElementById("ophoogBtn").style.display = "inline-block";
      gevondenBoek = { id: inBezit.id, exemplaren: aantalExemplaren };
    } else {
      document.getElementById("opslaanBtn").style.display = "inline-block";
      document.getElementById("ophoogBtn").style.display = "none";
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
        exemplaren: 1
      };
    }
  } catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
    console.error(error);
  }
}

// Ophogen exemplaren
async function ophoogExemplaren() {
  if (!gevondenBoek || !gevondenBoek.id) return;
  const btn = document.getElementById("ophoogBtn");
  btn.disabled = true;
  btn.innerText = "Bezig met opslaan...";
  const nieuwAantal = gevondenBoek.exemplaren + 1;

  try {
    const response = await fetch(`http://localhost:3000/boeken/${gevondenBoek.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exemplaren: nieuwAantal })
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById("feedback").innerText = `Aantal exemplaren bijgewerkt naar ${nieuwAantal}`;
      gevondenBoek.exemplaren = nieuwAantal;
    } else {
      document.getElementById("feedback").innerText = "Fout bij bijwerken.";
    }
  } catch (error) {
    document.getElementById("feedback").innerText = "Netwerkfout.";
    console.error(error);
  } finally {
    btn.disabled = false;
    btn.innerText = "Extra exemplaar toevoegen";
  }
}

// Nieuw boek opslaan
function voegBoekToe() {
  if (!gevondenBoek) {
    document.getElementById("feedback").innerText = "Zoek eerst een boek op.";
    return;
  }
  const btn = document.getElementById("opslaanBtn");
  btn.disabled = true;
  btn.innerText = "Bezig met opslaan...";

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
    } else {
      document.getElementById("feedback").innerText = "Fout bij opslaan.";
    }
  })
  .catch(() => {
    document.getElementById("feedback").innerText = "Netwerkfout.";
  })
  .finally(() => {
    btn.disabled = true;
    btn.innerText = "Opgeslagen in Database";
  });
}

// Check of boek al bestaat
async function checkBestaat(isbn) {
  try {
    const response = await fetch(`http://localhost:3000/boeken/getid?isbn13=${isbn}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const boek = data[0];
      return { exemplaren: parseInt(boek.exemplaren) || 0, id: boek.id, isbn13: boek.isbn13 };
    } else {
      return { exemplaren: 0, id: null, isbn13: null };
    }
  } catch (error) {
    console.error(error);
    return { exemplaren: 0, id: null };
  }
}
