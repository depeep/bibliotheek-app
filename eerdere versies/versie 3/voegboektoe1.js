let gevondenBoek = null; 

document.getElementById("opslaanBtn").style.display = "none"; //knop nog niet laten zien


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
    //  Bewaar het boek
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
        afbeelding: book.imageLinks?.thumbnail ?? "./img/plaatje.jpg"
      };
    // Toon resultaat //nu met isbn13
    resultDiv.innerHTML = `
      <h2>${book.title}</h2>
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

  } catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
  }
}


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

// Enter-toets activeren voor isbnInput
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });
