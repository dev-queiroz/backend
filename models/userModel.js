// models/userModel.js
const { supabase } = require('../app');

// Função para encontrar um usuário por e-mail
exports.findByEmail = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    if (error) throw new Error(error.message);
    return data;
};

// Função para criar um novo usuário
exports.createUser = async (email, password_hash) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password_hash }]);
    if (error) throw new Error(error.message);
    return data;
};
