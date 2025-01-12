const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./database/database');
const User = require('./database/user');
const Movie = require('./database/movie');
const seedDatabase = require('./database/seed');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, role, address, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role, address, phoneNumber });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Unauthorized' });
    try {
        const payload = jwt.verify(token, 'secretKey');
        req.user = payload;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

app.get('/movies', authenticate, async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

seedDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
