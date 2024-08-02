// controllers/authController.js
const { findByEmail, createUser } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    try {
        const user = await createUser(email, password_hash);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
