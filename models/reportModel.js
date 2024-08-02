// models/reportModel.js
const { supabase } = require('../app');

// Função para criar um relatório de e-mail
exports.createReport = async (email_id, status, recipient_email, opened_at, clicked_at) => {
    const { data, error } = await supabase
        .from('reports')
        .insert([{ email_id, status, recipient_email, opened_at, clicked_at }]);
    if (error) throw new Error(error.message);
    return data;
};

// Função para listar relatórios de e-mails
exports.getReports = async (email_id) => {
    const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('email_id', email_id);
    if (error) throw new Error(error.message);
    return data;
};
