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
app.get('/boeken', (req, res) => {
   db.query('SELECT * FROM boeken', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      res.json(results);
   });
});


// INSERT: Voeg een nieuw boek toe 
app.post('/boeken', (req, res) => {
  const { isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas } = req.body;

  const sql = `
    INSERT INTO boeken 
    (isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, afbeelding, taal, paginas], (err, result) => {
    if (err) {
      console.error('Fout bij toevoegen:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, id: result.insertId });
  });
});

/* 
// GET: Haal een specifieke burger op
app.get('/burgers/:id', (req, res) => {
   const burgerId = req.params.id;
   const sql = 'SELECT * FROM burgers WHERE id = ?';
   db.query(sql, [burgerId], (err, results) => {
      if (err) {
         return res.status(500).json({ success: false, error: err });
      }
      if (results.length === 0) {
         return res.status(404).json({ success: false, message: 'Burger niet gevonden' });
      }
      res.json(results[0]);
   });
});

// PUT: Update een specifieke burger
app.put('/burgers/:id', (req, res) => {
   const burgerId = req.params.id;
   const { naam, vader, moeder } = req.body;

   const sql = 'UPDATE burgers SET naam = ?, vader = ?, moeder = ? WHERE id = ?';
   db.query(sql, [naam, vader, moeder, burgerId], (err, result) => {
      if (err) {
         return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true });
   });
});

*/

// Start de server
app.listen(3000, () => {
   console.log('Server draait op http://localhost:3000');
});