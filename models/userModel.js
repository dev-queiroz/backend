const { supabase } = require('../app');

// Função para criar um novo usuário
exports.createUser = async (email, password_hash) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password_hash }]);

    if (error) throw error;
    return data[0];
};

// Função para encontrar um usuário pelo e-mail
exports.findByEmail = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) throw error;
    return data;
};
