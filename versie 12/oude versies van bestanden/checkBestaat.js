
/* 
de functie checkBestaat() zoekt in de eigen database of een isbn nummer al voorkomt in de database
en geeft true of  false terug. 
Er moet wel een async functie gebruikt worden als je await wil gebruiken, daarom is de functie ingevoerd() async.
ingevoerd() roept checkBestaat() aan.
*/

// Enter-toets activeren voor isbnInput
 
  document.getElementById("isbnInput").addEventListener("keypress", e => {
    if (e.key === "Enter") ingevoerd();
  });



async function ingevoerd() {
  const isbn = document.getElementById("isbnInput").value.trim();
  const resultElement = document.getElementById("result");
  const invoerElement = document.getElementById("isbnInput");
  
  if (!isbn) {
    resultElement.innerHTML = "Voer een ISBN in";
    return;} 
  
    let bestaatAl = await checkBestaat(isbn)
    invoerElement.value = '';
        if (bestaatAl === true) {
        resultElement.innerHTML = `${isbn} staat al in de database. Resultaat =  ${bestaatAl}`;
        } else {
        resultElement.innerHTML = `${isbn} staat nog niet in de database. Resultaat =  ${bestaatAl}`; 
        }
        
}

// kijken of een boek al in de database staat en true of false teruggeven
async function checkBestaat(isbn) {

try {
   const response = await fetch(`http://localhost:3000/boeken?isbn=${isbn}`);
   const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    return true; 

  } else {
    return false;
  }
 
} catch (error) {
  document.getElementById("result").innerHTML = "Fout bij ophalen van gegevens";
  console.error(error);
}
}

