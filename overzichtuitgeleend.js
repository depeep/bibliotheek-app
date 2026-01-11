function fetchUitgeleend() {
  fetch('http://localhost:3000/uitleen/details')
    .then(res => res.json())
    .then(data => {
      const lijst = document.getElementById('uitleenLijst');
      lijst.innerHTML = '';

      data.forEach(uitleen => {
        const div = document.createElement('div');
        div.classList.add('uitleen');
        /* if (uitleen.actief === 1) { //overbodig geworden door backend aanpassing
          uitleen.actief = 'Ja';
        } else {
          uitleen.actief = 'Nee';
        } 
          */
         
        // datum formatteren naar DD-MM-YYYY >> wordt nu dus formattedDate
        const datum = new Date(uitleen.datum);
        const formattedDate = datum.toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        });
  
        div.innerHTML = `
          <div class="uitleen-info"> 
            <img src="${uitleen.afbeelding}" alt="${uitleen.titel}" class="uitleen-image">
            <h3>${uitleen.titel}</h3>
            <p><b>Lener:</b> ${uitleen.lener_naam}</p>
            <p><b>Uitleendatum:</b> ${formattedDate}</p>    
          </div>


        `;
        lijst.appendChild(div);
      });
    });
}

fetchUitgeleend();


