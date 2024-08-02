require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

// Importar as rotas
const routes = require('./routes/routes');

// Configurar o Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Criar a aplicação Express
const app = express();

// Configurar o middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definir as rotas
app.use('/api', routes);

// Configurar a rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo ao SaaS de Automação de E-mails!');
});

// Configurar o servidor para escutar na porta especificada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, supabase };
