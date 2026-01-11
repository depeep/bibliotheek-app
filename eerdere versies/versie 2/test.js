function fetchBoeken() {
  fetch('http://localhost:3000/boeken')
    .then(res => res.json())
    .then(data => {
      const lijst = document.getElementById('boekLijst');
      lijst.innerHTML = '';

      data.forEach(boek => {
        const div = document.createElement('div');
        div.classList.add('boek');
        div.innerHTML = `
          <h3>${boek.titel}</h3>
          <p>Isbn: ${boek.isbn10}</p>
          <p>Schrijver: ${boek.auteur}</p>
          <p>Taal: ${boek.taal}</p>
          <img src="${boek.afbeelding}" />
        `;
        lijst.appendChild(div);
      });
    });
}


// test frontend hiermee haal je data uit de database en laat ze zien

document.getElementById("boekForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const boek = {
    isbn10: document.getElementById("isbn10").value,
    titel: document.getElementById("titel").value,
    auteur: document.getElementById("auteur").value,
    uitgeverij: document.getElementById("uitgeverij").value,
    beschrijving: document.getElementById("beschrijving").value,
    publicatiejaar: document.getElementById("publicatiejaar").value,
    afbeelding: document.getElementById("afbeelding").value
    
  };

  fetch("http://localhost:3000/boeken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boek)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("feedback").innerText = "Boek succesvol toegevoegd!";
      document.getElementById("boekForm").reset();
      fetchBoeken(); // lijst opnieuw laden
    } else {
      document.getElementById("feedback").innerText = "Fout bij toevoegen.";
    }
  });
});