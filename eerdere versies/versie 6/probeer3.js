
// Laad boekenlijst bij start
window.onload = fetchBoeken;

// Zoek boeken via Google Books API
async function searchBook() {
  const titel = document.getElementById("titelInput").value.trim();
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titel}`;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Bezig met zoeken...";
  document.getElementById("feedback").innerText = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "<p>Geen boeken gevonden.</p>";
      return;
    }

    resultDiv.innerHTML = "";
    for (const item of data.items) {
      const book = item.volumeInfo;
      const isbn10 = book.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
      const isbn13 = book.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;

      const inBezit = await checkBestaat(isbn13);

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
        afbeelding: book.imageLinks?.thumbnail ?? "./img/plaatje.jpg",
        exemplaren: inBezit.exemplaren > 0 ? inBezit.exemplaren : 1,
        id: inBezit.id
      };

      const card = document.createElement("div");
      card.classList.add("boekCard");
      card.innerHTML = `
        <h3>${boekData.titel}</h3>
        <p><b>Auteur:</b> ${boekData.auteur}</p>
        <p><b>ISBN13:</b> ${boekData.isbn13}</p>
        <p><b>Exemplaren in bezit:</b> ${boekData.exemplaren}</p>
        <img src="${boekData.afbeelding}" alt="Boek afbeelding">
      `;

      const opslaanBtn = document.createElement("button");
      opslaanBtn.textContent = "Opslaan in Database";
      const ophoogBtn = document.createElement("button");
      ophoogBtn.textContent = "Extra exemplaar toevoegen";

      if (inBezit.exemplaren > 0) {
        opslaanBtn.style.display = "none";
        ophoogBtn.style.display = "inline-block";
      } else {
        opslaanBtn.style.display = "inline-block";
        ophoogBtn.style.display = "none";
      }

      opslaanBtn.addEventListener("click", () => voegBoekToe(boekData));
      ophoogBtn.addEventListener("click", () => ophoogExemplaren(boekData));

      card.appendChild(opslaanBtn);
      card.appendChild(ophoogBtn);
      resultDiv.appendChild(card);
    }
  } catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
    console.error(error);
  }
}

// Ophogen exemplaren
async function ophoogExemplaren(boekData) {
  const nieuwAantal = boekData.exemplaren + 1;
  document.getElementById("feedback").innerText = "Bezig met bijwerken...";
  try {
    const response = await fetch(`http://localhost:3000/boeken/${boekData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exemplaren: nieuwAantal })
    });
    const result = await response.json();
    if (result.success) {
      document.getElementById("feedback").innerText = `Aantal exemplaren bijgewerkt naar ${nieuwAantal}`;
      fetchBoeken();
    }
  } catch (error) {
    document.getElementById("feedback").innerText = "Netwerkfout.";
  }
}

// Nieuw boek opslaan
function voegBoekToe(boekData) {
  document.getElementById("feedback").innerText = "Bezig met opslaan...";
  fetch("http://localhost:3000/boeken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boekData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("feedback").innerText = "✅ Boek succesvol opgeslagen!";
      fetchBoeken();
    } else {
      document.getElementById("feedback").innerText = "Fout bij opslaan.";
    }
  })
  .catch(() => {
    document.getElementById("feedback").innerText = "Netwerkfout.";
  });
}

// Check of boek al bestaat
async function checkBestaat(isbn) {
  try {
    const response = await fetch(`http://localhost:3000/boeken/getid?isbn13=${isbn}`);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const boek = data[0];
      return { exemplaren: parseInt(boek.exemplaren) || 0, id: boek.id };
    } else {
      return { exemplaren: 0, id: null };
    }
  } catch {
    return { exemplaren: 0, id: null };
  }
}

// Haal alle boeken uit database
async function fetchBoeken() {
  const lijstDiv = document.getElementById("boekenLijst");
  lijstDiv.innerHTML = "Laden...";
  try {
    const response = await fetch("http://localhost:3000/boeken");
    const data = await response.json();
    if (data.length === 0) {
      lijstDiv.innerHTML = "<p>Geen boeken in database.</p>";
      return;
    }
    lijstDiv.innerHTML = data.map(boek => `
      <div>
        <h4>${boek.titel}</h4>
        <p><b>Auteur:</b> ${boek.auteur}</p>
        <p><b>Exemplaren:</b> ${boek.exemplaren}</p>
      </div>
    `).join('');
  } catch {
    lijstDiv.innerHTML = "Fout bij laden van boeken.";
  }
}
