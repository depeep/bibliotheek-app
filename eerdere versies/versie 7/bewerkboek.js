
let selectedBookId = null;

async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const titel = document.getElementById("titelInput").value.trim();
  const auteur = document.getElementById("auteurInput").value.trim();

  const params = new URLSearchParams();
  if (isbn) params.append("isbn", isbn);
  if (titel) params.append("titel", titel);
  if (auteur) params.append("auteur", auteur);

  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "Zoeken...";

  try {
    const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`);
    if (!response.ok) throw new Error(`Serverfout: ${response.status}`);

    const data = await response.json();

    if (!data || data.length === 0) {
      resultContainer.textContent = "Geen boek gevonden";
      return;
    }

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

      const auteurEl = document.createElement("p");
      auteurEl.innerHTML = `<strong>Auteur:</strong> ${book.auteur}`;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Bewerken";
      editBtn.onclick = () => editBook(book);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Verwijderen";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteBook(book.id);

      card.append(img, title, auteurEl, editBtn, deleteBtn);
      container.appendChild(card);
    });

    resultContainer.innerHTML = "";
    resultContainer.appendChild(container);

    // Velden leegmaken
    document.getElementById("isbnInput").value = "";
    document.getElementById("titelInput").value = "";
    document.getElementById("auteurInput").value = "";

  } catch (error) {
    resultContainer.textContent = `Er is een fout opgetreden: ${error.message}`;
  }
}

function editBook(book) {
  selectedBookId = book.id; // Zorg dat je backend een ID teruggeeft
  document.getElementById("editTitel").value = book.titel;
  document.getElementById("editAuteur").value = book.auteur;
  document.getElementById("editUitgeverij").value = book.uitgeverij;
  document.getElementById("editJaar").value = book.publicatiejaar;
  document.getElementById("editExemplaren").value = book.exemplaren;

  document.getElementById("editForm").style.display = "block";
}

async function updateBook() {
  const updatedBook = {
    titel: document.getElementById("editTitel").value,
    auteur: document.getElementById("editAuteur").value,
    uitgeverij: document.getElementById("editUitgeverij").value,
    publicatiejaar: document.getElementById("editJaar").value,
    exemplaren: document.getElementById("editExemplaren").value
  };

  try {
    const response = await fetch(`http://localhost:3000/boeken/${selectedBookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook)
    });

    if (!response.ok) throw new Error("Fout bij opslaan");
    alert("Boek succesvol bijgewerkt!");
    document.getElementById("editForm").style.display = "none";
    searchBook(); // herlaad de lijst
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

//nieuwe functie patchBook, vervangt updateBook, stuurt alleen velden die niet leeg zijn naar de backend
//misschien ook te gebruiken bij ophogen van exemplaren
async function patchBook() {
  const updatedFields = {};

  // Voeg alleen velden toe die niet leeg zijn
  const titel = document.getElementById("editTitel").value.trim();
  const auteur = document.getElementById("editAuteur").value.trim();
  const uitgeverij = document.getElementById("editUitgeverij").value.trim();
  const jaar = document.getElementById("editJaar").value.trim();
  const exemplaren = document.getElementById("editExemplaren").value.trim();

  if (titel) updatedFields.titel = titel;
  if (auteur) updatedFields.auteur = auteur;
  if (uitgeverij) updatedFields.uitgeverij = uitgeverij;
  if (jaar) updatedFields.publicatiejaar = jaar;
  if (exemplaren) updatedFields.exemplaren = exemplaren;

  try {
    const response = await fetch(`http://localhost:3000/boeken/${selectedBookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    });

    if (!response.ok) throw new Error("Fout bij gedeeltelijke update");
    alert("Boek succesvol gedeeltelijk bijgewerkt!");
    document.getElementById("editForm").style.display = "none";
    searchBook(); // herlaad de lijst
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}


async function deleteBook(bookId) {
  if (!confirm("Weet je zeker dat je dit boek wilt verwijderen?")) return;

  try {
    const response = await fetch(`http://localhost:3000/boeken/${bookId}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Fout bij verwijderen");
    alert("Boek succesvol verwijderd!");
    searchBook(); // herlaad de lijst
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

// Enter-toets activeren
["isbnInput", "titelInput", "auteurInput"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") searchBook();
  });
});
