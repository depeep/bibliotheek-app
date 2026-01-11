import fetch from "node-fetch"; // npm install node-fetch

async function getBookData(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.log("Geen boek gevonden");
      return;
    }

    const book = data.items[0].volumeInfo;

    console.log("Titel:", book.title);
    console.log("Auteurs:", book.authors);
    console.log("Uitgever:", book.publisher);
    console.log("Publicatiejaar:", book.publishedDate);
    console.log("Beschrijving:", book.description);
  } catch (error) {
    console.error("Fout bij ophalen:", error);
  }
}

const isbn = process.argv[2] || "9789022581120"; // ISBN via command line
getBookData(isbn);