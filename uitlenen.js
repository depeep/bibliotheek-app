const apiUrl = "http://localhost:3000/leners"; // Backend endpoint voor lenersbeheer
const apiUitleenUrl = "http://localhost:3000/uitleen"; // Backend endpoint voor uitleenbeheer
let boekId= '';
let lenerId= ''; 


// functie searchLener uit lenersbeheer - result uit html is nu resultLener
async function searchLener() {
  const naam = document.getElementById("zoekNaam").value.trim();
  const resultDiv = document.getElementById("resultLener");
  resultDiv.innerHTML = "Zoeken...";

  try {
    const response = await fetch(`${apiUrl}?naam=${naam}`);
    if (!response.ok) throw new Error("Fout bij zoeken");

    const data = await response.json();
    if (data.length === 0) {
      resultDiv.innerHTML = "Geen lener gevonden";
      return;
    }
    let html = "<h3>Gevonden leners:</h3><ul>";
    // knoppen nog vervangen door selecteer knop
    data.forEach(lener => {
      html += `
        <li>
          ID: ${lener.id}, Naam: ${lener.naam}, Actief: ${lener.actief}
          <button onclick = "selecteerLener('${lener.id}',' ${lener.naam}')">Selecteer</button>
        </li>
      `;
    });
    html += "</ul>";
    resultDiv.innerHTML = html;
    
  } catch (error) {
    resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
  }
}

// functie searchbook uit zoekboek, auteur eruit, seult uit html vervangen door resultBoek
async function searchBook() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const titel = document.getElementById("titelInput").value.trim();
//   const auteur = document.getElementById("auteurInput").value.trim();


  const params = new URLSearchParams();
  if (isbn) params.append("isbn", isbn);
  if (titel) params.append("titel", titel);
//   if (auteur) params.append("auteur", auteur);

  const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`);
  // http://localhost:3000/boeken?isbn=9781394348121 bijvoorbeeld of http://localhost:3000/boeken?titel=harry
  const data = await response.json();

  if (!data || data.length === 0) {
    document.getElementById("resultBoek").innerHTML = "Geen boek gevonden";
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
      <p><strong>Jaar:</strong> ${book.publicatiejaar}</p>
      <button onclick="selecteerBoek('${book.id}','${book.titel}')">Selecteren</button>
    </div>
  `;
});
html += '</div>';


  document.getElementById("resultBoek").innerHTML = html;
  
// velden weer leegmaken

//   document.getElementById("isbnInput").value=""
//   document.getElementById("titelInput").value=""
//   document.getElementById("auteurInput").value=""

}

// Enter-toets activeren voor isbnInput, titelInput en auteurInput


["isbnInput", "titelInput"].forEach(id => {
  document.getElementById(id).addEventListener("keypress", e => {
    if (e.key === "Enter") searchBook();
  });
});

// functies selecteerLener en selecteerBoek om data naar slaOp te sturen
function selecteerLener(id, naam){
  document.getElementById("geselecteerdeLener").innerHTML= `<b> geselecteerd: ${id} - ${naam} </b>`;
  lenerId= id;
}

function selecteerBoek(id, titel){
  document.getElementById("geselecteerdeBoek").innerHTML= `<b> geselecteerd: ${id} - ${titel} </b>
     <button onclick="slaOp()">SlaOp</button>
  `;
  boekId= id;
}


// functie slaOp om uitleen op te slaan
async function slaOp(){
    window.alert('Opslaan functie gestart voor boekId: ' + boekId + ' en lenerId: ' + lenerId);
      if (!boekId) {
    window.alert("boek selecteren is verplicht!");
    return;
      }
      if (!lenerId) {
    window.alert("lener selecteren is verplicht!");
    return;   
      }
      const uitleenData = {
        boekid: boekId,
        lenersid: lenerId,
        datum: new Date().toISOString().split('T')[0], // Huidige datum in YYYY-MM-DD formaat
        actief: 1
      };  
      console.log("Uitleen data om op te slaan:", uitleenData);
    
      try {
        const response = await fetch('http://localhost:3000/uitleen', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uitleenData)
        });
      }
       catch (error) {
        console.error("Fout bij het opslaan van uitleen:", error);
        window.alert("Er is een fout opgetreden bij het opslaan van de uitleen.");
      }   

      if (!response.ok) throw new Error("Fout bij opslaan uitleen");
      const result = await response.json();
      window.alert(`Uitleen succesvol opgeslagen! Nieuw ID: ${result.id}`);      
      // Velden en selecties leegmaken na opslaan
      document.getElementById("geselecteerdeBoek").innerHTML= "";
      document.getElementById("geselecteerdeLener").innerHTML= "";
      boekId= '';
      lenerId= '';      
  }
  
// todo: 
// resultDiv constructie ook gebruiken in searchBoek
// const ApiURL ook gebruiken bij searchBoek of gewoon echte URL invullen in const response = await fetch(`${apiUrl}?naam=${naam}`);




