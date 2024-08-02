// controllers/contactController.js
const { supabase } = require('../app');

// Função para adicionar um novo contato
exports.createContact = async (req, res) => {
    const { user_id, name, email, tags } = req.body;

    const { data, error } = await supabase
        .from('contacts')
        .insert([{ user_id, name, email, tags }]);

    if (error) return res.status(400).json({ error: error.message });
    
    res.status(201).json({ message: 'Contato adicionado com sucesso!' });
};

// Função para listar contatos
exports.getContacts = async (req, res) => {
    const { user_id } = req.query;

    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user_id);

    if (error) return res.status(400).json({ error: error.message });
    
    res.json(data);
};

// Função para atualizar um contato
exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, tags } = req.body;

    const { data, error } = await supabase
        .from('contacts')
        .update({ name, email, tags })
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({ message: 'Contato atualizado com sucesso!' });
};

// Função para excluir um contato
exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({ message: 'Contato excluído com sucesso!' });
};
