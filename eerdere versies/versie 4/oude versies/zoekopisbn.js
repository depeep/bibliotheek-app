 async function searchBook() {
      const isbn = document.getElementById("isbnInput").value;
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "Bezig met zoeken...";

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          resultDiv.innerHTML = "Geen boek gevonden";
          return;
        }

        const book = data.items[0].volumeInfo;
        const isbn10 = book.industryIdentifiers.find(id => id.type === "ISBN_10")?.identifier;


        resultDiv.innerHTML = `
          <h2>${book.title}</h2>
          <p><strong>isbn:</strong> ${isbn10}</p>
          <p><strong>Auteurs:</strong> ${book.authors?.join(", ")}</p>
          <p><strong>Uitgever:</strong> ${book.publisher}</p>
          <p><strong>Publicatiejaar:</strong> ${book.publishedDate}</p>
          <p><strong>Beschrijving:</strong> ${book.description}</p>
          ${book.imageLinks ? `<img src="${book.imageLinks.thumbnail}" />` : ""}
        `;
      } catch (error) {
        resultDiv.innerHTML = "Er ging iets mis bij het ophalen.";
      }
    }
    
// Enter-toets activeren voor isbnInput
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });

    searchBook()