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


// Endpoint om een boek gedeeltelijk bij te werken op id
app.patch('/boeken/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  // Controleer of er velden zijn om bij te werken
  if (!fields || Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'Geen velden om bij te werken' });
  }

  // Dynamisch SQL-query opbouwen
  const columns = Object.keys(fields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(fields);

  const sql = `UPDATE boeken SET ${columns} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Boek niet gevonden' });
    }

    res.json({ message: 'Boek succesvol gedeeltelijk bijgewerkt' });
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


// Endpoint om een boek te verwijderen op id
app.delete('/boeken/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM boeken WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Boek niet gevonden' });
    }

    res.json({ message: 'Boek succesvol verwijderd' });
  });
});

//  GET /leners (optioneel filter op naam)
app.get('/leners', (req, res) => {
  const { naam } = req.query;
  let sql = 'SELECT * FROM leners';
  let params = [];

  if (naam) {
    sql += ' WHERE naam LIKE ?';
    params.push(`%${naam}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

//  POST /leners (nieuwe lener toevoegen)
app.post('/leners', (req, res) => {
  const { naam, actief } = req.body;
  if (!naam) return res.status(400).json({ message: 'Naam is verplicht' });

  const sql = 'INSERT INTO leners (naam, actief) VALUES (?, ?)';
  db.query(sql, [naam, actief], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Lener toegevoegd', id: result.insertId });
  });
});


//  PATCH /leners/:id (gedeeltelijk bijwerken)
app.patch('/leners/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (!fields || Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'Geen velden om bij te werken' });
  }

  const columns = Object.keys(fields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(fields);

  const sql = `UPDATE leners SET ${columns} WHERE id = ?`;
  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Lener niet gevonden' });

    res.json({ message: 'Lener bijgewerkt' });
  });
});

// DELETE /leners/:id (verwijderen)
app.delete('/leners/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM leners WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Lener niet gevonden' });

    res.json({ message: 'Lener verwijderd' });
  });
});

// endpoint voor uitleenbeheer 7 januari 2026

// ---- Hulp: eenvoudige validatie ---- MOET VOOR HET POST endpoint staan anders werkt het niet
function isValidDateYYYYMMDD(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return false;
  const y = +m[1], mo = +m[2] - 1, d = +m[3];
  const dt = new Date(Date.UTC(y, mo, d));
  return dt.getUTCFullYear() === y &&
         dt.getUTCMonth() === mo &&
         dt.getUTCDate() === d;
}

// ---- Endpoint: POST /uitleen ----
app.post('/uitleen', (req, res) => {
  const whereAmI = 'POST /uitleen';
  try {
    const { boekid, lenersid, datum, actief } = req.body;

    // Validatie
    const errors = [];
    const boekidNum   = parseInt(boekid, 10);
    const lenersidNum = parseInt(lenersid, 10);
    const actiefNum   = parseInt(actief, 10);

    if (Number.isNaN(boekidNum))    errors.push('boekid moet numeriek zijn');
    if (Number.isNaN(lenersidNum))  errors.push('lenersid moet numeriek zijn');
    if (!isValidDateYYYYMMDD(datum)) errors.push('datum moet YYYY-MM-DD zijn');
    if (![0, 1].includes(actiefNum)) errors.push('actief moet 0 of 1 zijn');

    if (errors.length) {
      console.warn(`[${whereAmI}] Validatie mislukt:`, errors);
      return res.status(400).json({ message: 'Validatie mislukt', errors });
    }

    // Insert
    const sql = `
      INSERT INTO uitleen (boekid, lenersid, datum, actief)
      VALUES (?, ?, ?, ?)
    `;
    const params = [boekidNum, lenersidNum, datum, actiefNum];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(`[${whereAmI}] DB-fout:`, {
          code: err.code, errno: err.errno, sqlState: err.sqlState, sqlMessage: err.sqlMessage
        });
        return res.status(500).json({ message: 'DB fout', error: err.sqlMessage || err.message });
      }
      if (!result || typeof result.insertId === 'undefined') {
        console.error(`[${whereAmI}] Insert zonder insertId`, result);
        return res.status(500).json({ message: 'Insert mislukt: geen insertId' });
      }
      console.info(`[${whereAmI}] Insert OK: insertId=${result.insertId}`);
      return res.status(201).json({ id: result.insertId });
    });
  } catch (err) {
    console.error(`[${whereAmI}] Serverfout:`, err);
    return res.status(500).json({ message: 'Interne serverfout' });
  }
});

// // SELECT: Haal alle boeken op (GET endpoint)
// app.get('/boeken/ALL', (req, res) => {
//    db.query('SELECT * FROM boeken', (err, results) => {
//       if (err) {
//         return res.status(500).json({ success: false, error: err });
//       }
//       res.json(results);
//    });
// });

//verbeterde GET /uitleen met datum formatting en actief als nummer
app.get('/uitleen', (req, res) => {
  const { boekid, lenersid, datum, actief } = req.query;
  let sql = 'SELECT * FROM uitleen WHERE 1=1';
  const params = [];

  if (boekid) {
    sql += ' AND boekid = ?';
    params.push(boekid);
  }

  if (lenersid) {
    sql += ' AND lenersid = ?';
    params.push(lenersid);
  }

  if (datum) {
    sql += ' AND datum = ?';
    params.push(datum);
  }

  if (actief !== undefined && actief !== null) {
    sql += ' AND actief = ?';
    params.push(Number(actief));
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }

    // Formatteren van datum + actief
    const formatted = results.map(row => {
      return {
        ...row,
        datum: row.datum
          ? row.datum.toISOString().split('T')[0]  // → "YYYY-MM-DD"
          : null,
        actief: Buffer.isBuffer(row.actief)
          ? row.actief[0]                           // → 0 of 1
          : row.actief
      };
    });

    res.json(formatted);
  });
});




// Endpoint om alle uitgeleende boeken met lenernaam op te halen  
// in de query alleen actieve uitleen (actief = 1) en een CAST om actief als nummer te krijgen   ZONDER BUFFER EN DATAFORMATTING  
app.get('/uitleen/details', (req, res) => {
  const sql = `
    SELECT boeken.afbeelding, boeken.titel, leners.naam AS lener_naam, uitleen.datum, CAST(uitleen.actief AS UNSIGNED) AS actief
    FROM uitleen  
    INNER JOIN boeken ON boeken.id = uitleen.boekid
    INNER JOIN leners ON leners.id = uitleen.lenersid
    WHERE uitleen.actief = 1
    ORDER BY uitleen.datum;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }
    res.json(results);
  });
});

// Start de server
app.listen(3000, () => {
   console.log('Server draait op http://localhost:3000');
});


