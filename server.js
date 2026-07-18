const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'electromart'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

app.use(express.static('images'));

// Register user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword], 
        (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ success: false });
            }
            res.json({ success: true });
        }
    );
});

// Login user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false });
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        res.json({ success: match });
    });
});

// Place order
app.post('/order', (req, res) => {
    const { cart, total } = req.body;
    const userId = 1; // Assume user is logged in with ID 1 for simplicity

    db.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        const orderId = result.insertId;

        const orderItems = cart.map(item => [orderId, item.id, item.quantity, item.price]);
        db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', 
            [orderItems], 
            (err) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false });
                }
                res.json({ success: true });
            }
        );
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});