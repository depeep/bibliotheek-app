// zoek gebruiker, haal gebruikers id op, 
// doe query in uitleen op id en haal data op(zie overzicht geleende boeken),
//  knop indrukken verandert actief van 1 in 0, update van uitleen
const apiUrl = 'http://localhost:3000/leners';

async function zoekUitgeleendOpLener() {
    const zoekLener = document.getElementById('zoekNaam').value;
    //haal id van de lener op via fetch naar leners endpoint
    const lenerId = await  searchLener(zoekLener);

    document.getElementById('ResultaatlenerId').innerText = `Gekozen Lener ID: ${lenerId}`;
    //gebruik id om uitleen data op te halen
    

   
   
   
   

  async function searchLener(naam) {
  // const naam = document.getElementById("zoekNaam").value.trim();
  const resultDiv = document.getElementById("ResultaatlenerId");
  resultDiv.innerHTML = "Zoeken...";

  try {
    const response = await fetch(`${apiUrl}?naam=${naam}`);
    if (!response.ok) throw new Error("Fout bij zoeken");

    const data = await response.json();
    if (data.length === 0) {
      resultDiv.innerHTML = "Geen lener gevonden";
      return;
    }
    let html = "<h3>Gevonden leners: </h3><ul>";
    data.forEach(lener => {
      html += `
        <li>
          ID: ${lener.id}, Naam: ${lener.naam}
          <button onclick="return (${lener.id})">kies </button>
        </li>
      `;
    });
    html += "</ul>";
    resultDiv.innerHTML = html;
   
    } catch (error) {
    resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
  }
}

    // const response = await fetch(`/uitleen?lenernaam=${encodeURIComponent(zoekLener)}`);
    // const uitleenData = await response.json();
    // const uitleenLijst = document.getElementById('uitleenLijst');
    // uitleenLijst.innerHTML = '';
    // if (uitleenData.length === 0) {
    //     uitleenLijst.innerHTML = '<p>Geen uitgeleende boeken gevonden voor deze lener.</p>';
    //     return;
    // }
    // uitleenData.forEach(item => {
    //     const uitleenItem = document.createElement('div');
    //     uitleenItem.className = 'uitleen-item';
    //     uitleenItem.innerHTML = `
    //         <p><strong>Boektitel:</strong> ${item.boektitel}</p>
    //         <p><strong>Lenernaam:</strong> ${item.lenernaam}</p>
    //         <p><strong>Uitgeleend op:</strong> ${item.uitgeleend_op}</p>
    //         <button onclick="veranderActief(${item.id})">Verander Actief</button>
    //     `;
    //     uitleenLijst.appendChild(uitleenItem);
    // });
}