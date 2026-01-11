
async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const titel = document.getElementById("titelInput").value.trim();
  const auteur = document.getElementById("auteurInput").value.trim();

  const params = new URLSearchParams();
  if (isbn) params.append("isbn", isbn);
  if (titel) params.append("titel", titel);
  if (auteur) params.append("auteur", auteur);

  const resultContainer = document.getElementById("result");

  try {
    const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`);
    if (!response.ok) throw new Error(`Serverfout: ${response.status}`);

    const data = await response.json();

    if (!data || data.length === 0) {
      resultContainer.textContent = "Geen boek gevonden";
      return;
    }

    // Maak een container element
    const container = document.createElement("div");
    container.className = "result-container";

    data.forEach(book => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = book.afbeelding;
      img.alt = book.titel;

      const title = document.createElement("h3");
      title.textContent = book.titel;

      const isbnEl = document.createElement("p");
      isbnEl.innerHTML = `<strong>ISBN13:</strong> ${book.isbn13}`;

      const auteurEl = document.createElement("p");
      auteurEl.innerHTML = `<strong>Auteur:</strong> ${book.auteur}`;

      const uitgeverEl = document.createElement("p");
      uitgeverEl.innerHTML = `<strong>Uitgever:</strong> ${book.uitgeverij}`;

      const jaarEl = document.createElement("p");
      jaarEl.innerHTML = `<strong>Jaar:</strong> ${book.publicatiejaar}`;

      const exemplarenEl = document.createElement("p");
      exemplarenEl.innerHTML = `<strong>Exemplaren in bezit:</strong> <i>${book.exemplaren}</i>`;

      // Voeg alle elementen toe aan de kaart
      card.append(img, title, isbnEl, auteurEl, uitgeverEl, jaarEl, exemplarenEl);
      container.appendChild(card);
    });

    // Vervang de oude inhoud
    resultContainer.innerHTML = "";
    resultContainer.appendChild(container);

    // Velden leegmaken (optioneel)
    document.getElementById("isbnInput").value = "";
    document.getElementById("titelInput").value = "";
    document.getElementById("auteurInput").value = "";

  } catch (error) {
    resultContainer.textContent = `Er is een fout opgetreden: ${error.message}`;
  }
}

// Enter-toets activeren
["isbnInput", "titelInput", "auteurInput"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") searchBook();
  });
});

