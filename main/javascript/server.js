var express = require('express');
var mysql = require('mysql');
var config = require('../json/config.json');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '..'))); 

var con = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'main.html'));
});

app.get('/random-text', (req, res) => {
  con.query("SELECT content FROM texts ORDER BY RAND() LIMIT 1", function(err, result) {
    if (err) throw err;
    res.json({ text: result[0].content });
  });
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
