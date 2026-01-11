
const apiUrl = "http://localhost:3000/leners"; // Backend endpoint
let idLener= ''; //toegevoegd om lener id op te slaan zonder dat het in formulier staat



// Enter-toets activeren voor zoeknaam
document.getElementById("zoekNaam").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchLener();
  }
});

// Enter-toets activeren voor wijzigen/toevoegen via het invoerveld lenerNaam
document.getElementById("lenerNaam").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchLener();
  }
});

async function addOrUpdateLener() {
  const id = idLener; //gebruik de variabele in plaats van formulier veld
  const naam = document.getElementById("lenerNaam").value.trim();
  const actief = parseInt(document.getElementById("lenerActief").value);

  if (!naam) {
    alert("Naam is verplicht!");
    return;
  }

  const lenerData = { naam, actief };

  try {
    let response;
    if (id) {
      // PATCH voor update
      response = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lenerData)
      });
    } else {
      // POST voor nieuwe lener (ID wordt automatisch aangemaakt)
      response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lenerData)
      });
    }
 

    if (!response.ok) throw new Error("Fout bij opslaan");
    const result = await response.json();
    alert(`Lener succesvol opgeslagen! ${result.id ? "Nieuw ID: " + result.id : ""}`);
    clearForm();
    searchLener(); // Vernieuw lijst
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

async function searchLener() {
  const naam = document.getElementById("zoekNaam").value.trim();
  const resultDiv = document.getElementById("result");
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
    data.forEach(lener => {
      html += `
        <li>
           Naam: ${lener.naam}, Actief: ${lener.actief}
          <button onclick="vulFormulier('${lener.id}', '${lener.naam}', ${lener.actief})">Wijzig</button>
          <button onclick="verwijderLener(${lener.id})">Verwijder</button>
        </li>
      `;
    });
    html += "</ul>";
    
    resultDiv.innerHTML = html;
    
  } catch (error) {
    resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
  }
}

function vulFormulier(id, naam, actief) {
  
  //vullen
  lenerId= id; //toegevoegd om lener id op te slaan zonder dat het in formulier staat
  document.getElementById("lenerNaam").value = naam;
  document.getElementById("lenerActief").value = actief;
}

function clearForm() {
  idLener= ''; //leegmaken van de variabele
  document.getElementById("lenerNaam").value = "";
  document.getElementById("lenerActief").value = "1";
}


async function verwijderLener(id) {
  if (!confirm("Weet je zeker dat je deze lener wilt verwijderen?")) {
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Fout bij verwijderen");
    }

    const result = await response.json();
    alert(result.message || "Lener verwijderd");
    searchLener(); // Vernieuw de lijst na verwijderen
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

