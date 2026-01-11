
// const apiUrl = 'http://localhost:3000/leners';
// const uitleenUrl = 'http://localhost:3000/uitleen/'; // endpoint voor uitleengegevens

// document.getElementById('zoekBtn').addEventListener('click', zoekUitgeleendOpLener);

// async function zoekUitgeleendOpLener() {
//     const zoekLener = document.getElementById('zoekNaam').value.trim();
//     const resultDiv = document.getElementById("ResultaatlenerId");
//     resultDiv.innerHTML = "";

//     if (!zoekLener) {
//         alert("Voer een naam in om te zoeken.");
//         return;
//     }

//     resultDiv.innerHTML = "Zoeken...";

//     try {
//         const response = await fetch(`${apiUrl}?naam=${zoekLener}`);
//         if (!response.ok) throw new Error("Fout bij zoeken");

//         const data = await response.json();
//         if (data.length === 0) {
//             resultDiv.innerHTML = "Geen lener gevonden";
//             return;
//         }

//         // Maak lijst van gevonden leners
//         const ul = document.createElement('ul');
//         data.forEach(lener => {
//             const li = document.createElement('li');
//             li.textContent = `ID: ${lener.id}, Naam: ${lener.naam} `;

//             const button = document.createElement('button');
//             button.textContent = 'kies';
//             button.addEventListener('click', () => zoekBoekId(lener.id));

//             li.appendChild(button);
//             ul.appendChild(li);
//         });

//         resultDiv.innerHTML = "<h3>Gevonden leners:</h3>";
//         resultDiv.appendChild(ul);

//     } catch (error) {
//         resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
//     }
// }

// async function zoekBoekId(id) {
//     const resultDiv = document.getElementById('ResultaatlenerId');
//     resultDiv.innerHTML = `Gekozen Lener ID: ${id}<br>Uitleengegevens worden opgehaald...`;

//     try {
//         // const response = await fetch(`${uitleenUrl}): ?lenersid=${id}`);
//         const response = await fetch(`${uitleenUrl}?lenersid=${id}`);
//         if (!response.ok) throw new Error("Fout bij ophalen uitleengegevens");

//         const uitleenData = await response.json();
//         if (uitleenData.length === 0) {
//             resultDiv.innerHTML += "<br>Geen uitleengegevens gevonden.";
//             return;
//         }

//         const ul = document.createElement('ul');
//         uitleenData.forEach(item => {
//             const li = document.createElement('li');
//             li.textContent = `Boekid: ${item.titel}, Datum: ${item.datum}`;
//             ul.appendChild(li);
//         });

//         resultDiv.innerHTML += "<h4>Uitleengegevens:</h4>";
//         resultDiv.appendChild(ul);

//     } catch (error) {
//         resultDiv.innerHTML += "<br>Fout: " + error.message;
//     }
// }


const apiUrl = 'http://localhost:3000/leners';
const uitleenUrl = 'http://localhost:3000/uitleen/terugbrengen'; // endpoint voor uitleengegevens

async function zoekLener() {
    const zoekLener = document.getElementById('zoekNaam').value.trim();
    if (!zoekLener) {
        alert("Voer een naam in om te zoeken.");
        return;
    }

    const resultDiv = document.getElementById("ResultaatlenerId");
    resultDiv.innerHTML = "Zoeken...";

    try {
        const response = await fetch(`${apiUrl}?naam=${zoekLener}`);
        if (!response.ok) throw new Error("Fout bij zoeken");

        const data = await response.json();
        if (data.length === 0) {
            resultDiv.innerHTML = "Geen lener gevonden";
            return;
        }

        // Maak lijst van gevonden leners
        let html = "<h3>Gevonden leners:</h3><ul>";
        data.forEach(lener => {
            html += `
                <li>
                    ID: ${lener.id}, Naam: ${lener.naam}
                    <button onclick="zoekBoekOpLener(${lener.id}, '${lener.naam}')">kies</button>
                </li>
            `;
        });
        html += "</ul>";
        resultDiv.innerHTML = html;

    } catch (error) {
        resultDiv.innerHTML = "Er is een fout opgetreden: " + error.message;
    }
}

// Functie om geselecteerde lener te tonen en uitleengegevens op te halen (transactieid)
async function zoekBoekOpLener(id, naam) {
    const resultDiv = document.getElementById('ResultaatlenerId');
    resultDiv.innerHTML = `Gekozen Lener ID: ${id} Naam ${naam} `;

    try {
        const response = await fetch(`${uitleenUrl}?lenerid=${id}`);
        if (!response.ok) throw new Error("Fout bij ophalen uitleengegevens");

        const uitleenData = await response.json();
        if (uitleenData.length === 0) {
            resultDiv.innerHTML += "<br>Geen uitleengegevens gevonden.";
            return;
        }

        let html = "<h4>Uitleengegevens:</h4><ul>";
        uitleenData.forEach(item => {
            // datum formatteren naar DD-MM-YYYY >> wordt nu dus formattedDate
            const datum = new Date(item.datum);
            const formattedDate = datum.toLocaleDateString('nl-NL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            });

            html += `
            <div class="uitleen-info">
            <li><img src="${item.afbeelding}" alt="${item.titel}" class="uitleen-image">Id = ${item.transactieid}, Boek: ${item.titel}, Datum: ${formattedDate}
            <button onclick="boekInnemen(${item.transactieid})">innemen</button></li>
            </div>`;
        });

        html += "</ul>";
        resultDiv.innerHTML += html;

    } catch (error) {
        resultDiv.innerHTML += "<br>Fout: " + error.message;
    }
}


async function boekInnemen(transactieid) {
    const inneemURL = `http://localhost:3000/uitleen/innemen/${transactieid}`;
    const confirmInnemen = confirm("Weet je zeker dat je dit boek wilt innemen?");
    if (!confirmInnemen) return;

    try {
        const response = await fetch(inneemURL, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Fout bij innemen");
        }

        const data = await response.json();
        alert(data.message || "Boek succesvol ingenomen!");
        
    } catch (error) {
        alert("Er is een fout opgetreden: " + error.message);
    }
}
