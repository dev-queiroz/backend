// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { supabase } = require('../app'); // Importar a instância do Supabase

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { email, password } = req.body;
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password_hash: hashedPassword }]);

    if (error) return res.status(400).json({ error: error.message });
    
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

// Função para login de um usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    
    if (error) return res.status(400).json({ error: error.message });
    
    const user = data;

    // Verificar a senha
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ error: 'Credenciais inválidas!' });

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
