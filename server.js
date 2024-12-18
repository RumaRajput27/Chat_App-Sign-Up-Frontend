const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db-config');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Signup Route
app.post('/signup', (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, password], (err, result) => {
        if (err) {
            console.error('Error saving user to database:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
        res.status(200).json({ success: true, message: 'User signed up successfully.' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
