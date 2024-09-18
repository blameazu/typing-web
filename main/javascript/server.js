require('dotenv').config();
var express = require('express');
var { Pool } = require('pg');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
var app = express();

var pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));



app.use(express.static(path.join(__dirname, '..', '..'))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const validPassword = await bcrypt.compare(password, result.rows[0].password);
      if (validPassword) {
        req.session.username = username;
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post('/regist', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (checkUser.rows.length > 0) {
      res.json({ success: false });
    } else {
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post('/get-info', async (req, res) => {
  const username = req.session.username;

  if (!username) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      res.json({ success: true, username: result.rows[0].username });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get('/random-text', async (req, res) => {
  try {
    const result = await pool.query('SELECT content FROM texts ORDER BY RANDOM() LIMIT 1');
    res.json({ text: result.rows[0].content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
