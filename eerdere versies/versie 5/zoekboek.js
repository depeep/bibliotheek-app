
async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const titel = document.getElementById("titelInput").value.trim();
  const auteur = document.getElementById("auteurInput").value.trim();


  const params = new URLSearchParams();
  if (isbn) params.append("isbn", isbn);
  if (titel) params.append("titel", titel);
  if (auteur) params.append("auteur", auteur);

  const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`);
  // http://localhost:3000/boeken?isbn=9781394348121 bijvoorbeeld of http://localhost:3000/boeken?titel=harry
  const data = await response.json();

  if (!data || data.length === 0) {
    document.getElementById("result").innerHTML = "Geen boek gevonden";
    return;
  }

  
let html = '<div class="result-container">';
data.forEach(book => {
  html += `
    <div class="card">
      <img src="${book.afbeelding}" alt="${book.titel}">
      <h3>${book.titel}</h3>
      <p><strong>ISBN13:</strong> ${book.isbn13}</p>
      <p><strong>Auteur:</strong> ${book.auteur}</p>
      <p><strong>Uitgever:</strong> ${book.uitgeverij}</p>
      <p><strong>Jaar:</strong> ${book.publicatiejaar}</p>
    </div>
  `;
});
html += '</div>';


  document.getElementById("result").innerHTML = html;
  
// velden weer leegmaken

  document.getElementById("isbnInput").value=""
  document.getElementById("titelInput").value=""
  document.getElementById("auteurInput").value=""

}

// Enter-toets activeren voor isbnInput, titelInput en auteurInput


["isbnInput", "titelInput", "auteurInput"].forEach(id => {
  document.getElementById(id).addEventListener("keypress", e => {
    if (e.key === "Enter") searchBook();
  });
});

// mijn originele code per veld
/*
document.getElementById("isbnInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });

document.getElementById("titelInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });

document.getElementById("auteurInput").addEventListener("keypress", function (e) {
if (e.key === "Enter") {
  searchBook();
  }
  });

  */