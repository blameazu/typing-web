require('dotenv').config();
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '..', '..'))); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  con.query(query, [username, password], (err, result) => {
    if(err) throw err;
    if(result.length > 0) res.json({ success: true });
    else res.json({ success: false });
  });
});

app.post('/regist', (req, res) => {
  const {username, password} = req.body;

  const qry = 'SELECT * FROM users WHERE username = ?';
  con.query(qry, [username], (err, re) => {
    if(err) throw err;
    if(re.length > 0) res.json({ success: false});
    else {
      const qry2 = 'INSERT INTO users (username, password) VALUES (?, ?)';
      con.query(qry2, [username, password], (err, re) => {
        if(err) throw err;
        res.json({ success: true});
      });
    }
  });
});

app.get('/random-text', (req, res) => {
  con.query("SELECT content FROM texts ORDER BY RAND() LIMIT 1", function(err, result) {
    if (err) throw err;
    res.json({ text: result[0].content });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
