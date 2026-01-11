function fetchUitgeleend() {
  fetch('http://localhost:3000/uitleen')
    .then(res => res.json())
    .then(data => {
      const lijst = document.getElementById('uitleenLijst');
      lijst.innerHTML = '';

      data.forEach(uitleen => {
        const div = document.createElement('div');
        div.classList.add('uitleen');

        div.innerHTML = `
            <div class="uitleen-info">
          <p><b>Uitleen ID:</b> ${uitleen.transactieid}</p>
          <p><b>Boek ID:</b> ${uitleen.boekid}</p>  
            <p><b>Lener ID:</b> ${uitleen.lenersid}</p>
            <p><b>Datum uitgeleend:</b> ${uitleen.datum}</p>
            <p><b>Actief:</b> ${uitleen.actief}</p>
            </div>
        `;  

        lijst.appendChild(div);
      });
    });
}

fetchUitgeleend();


