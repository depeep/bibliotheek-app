async function searchBook() {
  
  const titel = document.getElementById("titelInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titel}`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Bezig met zoeken...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultDiv.innerHTML = "Geen boeken gevonden";
      return;
    }

    // Maak een HTML-string voor ALLE boeken
    let html = "";

    data.items.forEach(item => {
      const book = item.volumeInfo;
      const isbn10 = book.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;

      html += `
        <div class="boek">
          <h2>${book.title}</h2>
          <p><strong>ISBN:</strong> ${isbn10 ?? "Onbekend"}</p>
          <p><strong>Auteurs:</strong> ${book.authors?.join(", ") ?? "Onbekend"}</p>
          <p><strong>Uitgever:</strong> ${book.publisher ?? "Onbekend"}</p>
          <p><strong>Publicatiejaar:</strong> ${book.publishedDate ?? "Onbekend"}</p>
          <p><strong>Beschrijving:</strong> ${book.description ?? "Geen beschrijving beschikbaar"}</p>
          ${book.imageLinks ? `<img src="${book.imageLinks.thumbnail}" />` : ""}
          <hr>
        </div>
      `;
    });

    resultDiv.innerHTML = html;

  } catch (error) {
    resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
  }
}

// Enter-toets activeren voor titelInput
document.getElementById("titelInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBook();
  }
});

searchBook();
