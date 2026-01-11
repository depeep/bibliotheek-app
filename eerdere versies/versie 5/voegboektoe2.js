
document.getElementById("opslaanBtn").style.display = "none"; //knop nog niet laten zien


async function searchBook() {
  const titel = document.getElementById("titelInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titel}`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Bezig met zoeken...";

  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "Geen boeken gevonden";
      return;
    }

    // Maak het resultaat leeg
    resultDiv.innerHTML = "";

    // Loop door ALLE boeken
    data.items.forEach(item => {
      const book = item.volumeInfo;
      const isbn10 = book.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
      const isbn13 = book.industryIdentifiers.find(id => id.type === "ISBN_13")?.identifier;

      // Bouw een boekobject dat naar de database kan
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

      // Maak een kaart voor elk boek
      const card = document.createElement("div");
      card.classList.add("boekCard");
      card.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>ISBN13: </strong> ${isbn13 ?? "Onbekend"}</p>
        <p><strong>ISBN10:</strong> ${isbn10 ?? "Onbekend"}</p>
        <p><strong>Auteurs:</strong> ${boekData.auteur ?? "Onbekend"}</p>
        <p><strong>Taal:</Strong>${book.language}</p>
        <p><strong>Aantal pagina's:</Strong>${book.pageCount}</p>
        <p><strong>Uitgever:</strong> ${boekData.uitgeverij ?? "Onbekend"}</p>
        <p><strong>Publicatiejaar:</strong> ${boekData.publicatiejaar ?? "Onbekend"}</p>
        <p><strong>Beschrijving:</strong> ${boekData.beschrijving ?? "Geen beschrijving"}</p>
        ${boekData.afbeelding ? `<img src="${boekData.afbeelding}" />` : ""}
        <button class="opslaanKnop">Opslaan in database</button>
      `;

      // Voeg klik‑event toe aan de knop
      card.querySelector(".opslaanKnop").addEventListener("click", () => {
        opslaanBoek(boekData);
      });

      resultDiv.appendChild(card);
    });

  } catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
  }
}
//boek opslaan
function opslaanBoek(boekData) {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = "";

  fetch("http://localhost:3000/boeken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boekData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      feedbackDiv.innerHTML = 
        `Boek "${boekData.titel}" succesvol opgeslagen!`;
        document.getElementById("titelInput").value = "";
      fetchBoeken();
    } else {
      feedbackDiv.innerHTML = "Fout bij opslaan.";
    }
  });
}

//oude code 
// document.getElementById("opslaanBtn").addEventListener("click", function () {
//   if (!gevondenBoek) {
//     document.getElementById("feedback").innerText = "Zoek eerst een boek op.";
//     return;
//   }

//   fetch("http://localhost:3000/boeken", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(gevondenBoek)
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       document.getElementById("feedback").innerText = "Boek succesvol opgeslagen!";
//       fetchBoeken(); // lijst opnieuw laden
//     } else {
//       document.getElementById("feedback").innerText = "Fout bij opslaan.";
//     }
//   });
// });

// Enter-toets activeren voor titelInput
document.getElementById("titelInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });
