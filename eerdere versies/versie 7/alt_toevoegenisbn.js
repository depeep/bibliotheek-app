
let gevondenBoek = null;
let isLoading = false;


const opslaanBtn = document.getElementById("opslaanBtn");
const ophoogBtn = document.getElementById("ophoogBtn");
const resultDiv = document.getElementById("result");
const feedbackDiv = document.getElementById("feedback");
const loaderDiv = document.getElementById("loader");

opslaanBtn.style.display = "none";
ophoogBtn.style.display = "none";
loaderDiv.style.display = "none";

// Event listeners
opslaanBtn.addEventListener("click", voegBoekToe);
ophoogBtn.addEventListener("click", ophoogExemplaren);
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBook();
    document.getElementById("isbnInput").value = '';

  }
});

// Zoek boek via Google Books API
async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();

  // Validatie ISBN
  if (!/^\d{10}(\d{3})?$/.test(isbn)) {
    showFeedback("Voer een geldig ISBN (10 of 13 cijfers) in.", false);
    return;
  }

  if (isLoading) return;
  isLoading = true;

  resetUI();
  loaderDiv.style.display = "block";

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    loaderDiv.style.display = "none";

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "Geen boek gevonden.";
      isLoading = false;
      return;
    }

    const book = data.items[0].volumeInfo;
    const isbn10 = book.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier || "Onbekend";
    const isbn13 = book.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier || "Onbekend";

    const inBezit = await checkBestaat(isbn13);
    let aantalExemplaren = inBezit.exemplaren > 0 ? inBezit.exemplaren : 0;

    resultDiv.innerHTML = `
      <h2>${book.title || "Onbekend"}</h2>
      ${book.imageLinks ? `<img src="${book.imageLinks.thumbnail}" alt="Boekafbeelding">` : ""}
      <p><strong>Exemplaren in bezit:</strong> <i>${aantalExemplaren}</i></p>
      <p><strong>ISBN13:</strong> ${isbn13}</p>
      <p><strong>ISBN10:</strong> ${isbn10}</p>
      <p><strong>Auteurs:</strong> ${book.authors?.join(", ") || "Onbekend"}</p>
      <p><strong>Taal:</strong> ${book.language || "Onbekend"}</p>
      <p><strong>Uitgever:</strong> ${book.publisher || "Onbekend"}</p>
      <p><strong>Jaar:</strong> ${book.publishedDate || "Onbekend"}</p>
    `;

    if (inBezit.exemplaren > 0) {
      opslaanBtn.style.display = "none";
      ophoogBtn.style.display = "inline-block";
      gevondenBoek = { id: inBezit.id, exemplaren: aantalExemplaren };
    } else {
      opslaanBtn.style.display = "inline-block";
      ophoogBtn.style.display = "none";
      gevondenBoek = {
        isbn13,
        isbn10,
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
    loaderDiv.style.display = "none";
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
    console.error(error);
  } finally {
    isLoading = false;
  }
}

// Ophogen exemplaren
async function ophoogExemplaren() {
  if (!gevondenBoek || !gevondenBoek.id) return;
  ophoogBtn.disabled = true;
  ophoogBtn.innerText = "Bezig met opslaan...";
  const nieuwAantal = gevondenBoek.exemplaren + 1;

  try {
    const response = await fetch(`http://localhost:3000/boeken/${gevondenBoek.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exemplaren: nieuwAantal })
    });

    const result = await response.json();
    showFeedback(result.success
      ? `Aantal exemplaren bijgewerkt naar ${nieuwAantal}`
      : "Fout bij bijwerken.", result.success);

    if (result.success) gevondenBoek.exemplaren = nieuwAantal;
  } catch (error) {
    showFeedback("Netwerkfout.", false);
    console.error(error);
  } finally {
    ophoogBtn.disabled = false;
    ophoogBtn.innerText = "Extra exemplaar toevoegen";
  }
}

// Nieuw boek opslaan
async function voegBoekToe() {
  if (!gevondenBoek) {
    showFeedback("Zoek eerst een boek op.", false);
    return;
  }
  opslaanBtn.disabled = true;
  opslaanBtn.innerText = "Bezig met opslaan...";

  try {
    const response = await fetch("http://localhost:3000/boeken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gevondenBoek)
    });
    const data = await response.json();
    showFeedback(data.success ? "Boek succesvol opgeslagen!" : "Fout bij opslaan.", data.success);
    if (data.success) document.getElementById("isbnInput").value = "";
  } catch {
    showFeedback("Netwerkfout.", false);
  } finally {
    opslaanBtn.disabled = true;
    opslaanBtn.innerText = "Opgeslagen in Database";
  }
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

// Helpers
function resetUI() {
  opslaanBtn.style.display = "none";
  ophoogBtn.style.display = "none";
  resultDiv.innerHTML = "";
  feedbackDiv.innerHTML = "";
}

function showFeedback(message, success) {
  feedbackDiv.innerText = message;
  feedbackDiv.className = success ? "success" : "error";
}
