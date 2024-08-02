// models/contactModel.js
const { supabase } = require('../app');

// Função para adicionar um novo contato
exports.createContact = async (user_id, name, email, tags) => {
    const { data, error } = await supabase
        .from('contacts')
        .insert([{ user_id, name, email, tags }]);
    if (error) throw new Error(error.message);
    return data;
};

// Função para listar contatos de um usuário
exports.getContacts = async (user_id) => {
    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
};

// Função para atualizar um contato
exports.updateContact = async (id, name, email, tags) => {
    const { data, error } = await supabase
        .from('contacts')
        .update({ name, email, tags })
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};

// Função para excluir um contato
exports.deleteContact = async (id) => {
    const { data, error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};
