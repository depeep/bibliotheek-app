
// Haal alle boeken op
app.get('/boeken', (req, res) => {
  db.query('SELECT * FROM boeken ORDER BY titel ASC', (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

// Check of boek bestaat
app.get('/boeken/getid', (req, res) => {
  const { isbn13 } = req.query;
  db.query('SELECT id, exemplaren FROM boeken WHERE isbn13 = ?', [isbn13], (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

// Nieuw boek opslaan
app.post('/boeken', (req, res) => {
  const boek = req.body;
  const sql = `INSERT INTO boeken (isbn13, isbn10, titel, auteur, uitgeverij, beschrijving, publicatiejaar, taal, paginas, afbeelding, exemplaren)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [boek.isbn13, boek.isbn10, boek.titel, boek.auteur, boek.uitgeverij, boek.beschrijving, boek.publicatiejaar, boek.taal, boek.paginas, boek.afbeelding, boek.exemplaren];
  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true, insertId: result.insertId });
  });
});

// Exemplaren ophogen
app.put('/boeken/:id', (req, res) => {
  const id = req.params.id;
  const { exemplaren } = req.body;
  db.query('UPDATE boeken SET exemplaren = ? WHERE id = ?', [exemplaren, id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});
