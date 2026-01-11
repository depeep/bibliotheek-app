
const apiUrl = "http://localhost:3000/leners"; // Pas aan naar jouw backend endpoint

async function addOrUpdateLener() {
  const id = document.getElementById("lenerId").value.trim();
  const naam = document.getElementById("lenerNaam").value.trim();
  const actief = document.getElementById("lenerActief").value;

  if (!naam) {
    alert("Naam is verplicht!");
    return;
  }

  const lenerData = { naam, actief: parseInt(actief) };

  try {
    let response;
    if (id) {
      // PATCH voor gedeeltelijke update
      response = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lenerData)
      });
    } else {
      // POST voor nieuwe lener
      response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lenerData)
      });
    }

    if (!response.ok) throw new Error("Fout bij opslaan");
    alert("Lener succesvol opgeslagen!");
    clearForm();
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

async function searchLener() {
  const naam = document.getElementById("zoekNaam").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Zoeken...";

  try {
    const response = await fetch(`${apiUrl}?naam=${encodeURIComponent(naam)}`);
    if (!response.ok) throw new Error("Fout bij zoeken");

    const data = await response.json();
    if (data.length === 0) {
      resultDiv.innerHTML = "Geen lener gevonden";
      return;
    }

    let html = "<h3>Gevonden leners:</h3><ul>";
    data.forEach(lener => {
      html += `<li>ID: ${lener.id}, Naam: ${lener.naam}, Actief: ${lener.actief}</li>`;
    });
    html += "</ul>";
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
  }
}

function clearForm() {
  document.getElementById("lenerId").value = "";
  document.getElementById("lenerNaam").value = "";
  document.getElementById("lenerActief").value = "1";
}
