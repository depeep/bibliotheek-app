const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); //toegevoegd wegens tweede server 

// Maak verbinding met de MySQL database
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'xampp-root', // vul je MySQL-wachtwoord in indien nodig
   database: 'bibliotheek'
});

db.connect(err => {
   if (err) {
      console.error('Database verbinding mislukt:', err);
      return;
   }
   console.log('Verbonden met MySQL database');
});

// SELECT: Haal alle boeken op (GET endpoint)
app.get('/boeken/ALL', (req, res) => {
   db.query('SELECT * FROM boeken', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      res.json(results);
   });
});


// INSERT: Voeg een nieuw boek toe //nu met isbn13
app.post('/boeken', (req, res) => {
  const { isbn13, isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas, exemplaren } = req.body;

  const sql = `
    INSERT INTO boeken 
    (isbn13,isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas, exemplaren) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [isbn13, isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas, exemplaren], (err, result) => {
    if (err) {
      console.error('Fout bij toevoegen:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, id: result.insertId });
  });
});


// GET: Haal een specifiek boek op

// GET: Zoek boeken op titel en/of ISBN
app.get('/boeken', (req, res) => {
  const { titel, isbn, auteur } = req.query; // query parameters
  let sql = 'SELECT * FROM boeken WHERE 1=1';
  const params = [];

  if (titel) {
    sql += ' AND titel LIKE ?';
    params.push(`%${titel}%`); // wildcard voor gedeeltelijke match
  }

  if (isbn) {
    sql += ' AND (isbn10 = ? OR isbn13 = ?)';
    params.push(isbn, isbn);
  }

   if (auteur) {
    sql += ' AND auteur LIKE ?';
    params.push(`%${auteur}%`); // wildcard voor gedeeltelijke match
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Geen boeken gevonden' });
    }
    res.json(results);
  });
});


//endpoint om aantallen op id te updaten
app.put('/boeken/:id', (req, res) => {
  const id = req.params.id;
  const { exemplaren } = req.body;
  const sql = 'UPDATE boeken SET exemplaren = ? WHERE id = ?';
  db.query(sql, [exemplaren, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json({ success: true });
  });
});



// Endpoint om id en aantal boeken op isbn te zoeken  //misschien overbodig
app.get('/boeken/getid', (req, res) => {
  const { isbn13 } = req.query;
  const sql = 'SELECT * FROM boeken WHERE isbn13 = ?';
  db.query(sql, [isbn13], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});



// Start de server
app.listen(3000, () => {
   console.log('Server draait op http://localhost:3000');
});