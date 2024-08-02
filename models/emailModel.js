// models/emailModel.js
const { supabase } = require('../app');

// Função para criar uma nova campanha de e-mail
exports.createEmail = async (user_id, subject, body, template_id, scheduled_at) => {
    const { data, error } = await supabase
        .from('emails')
        .insert([{ user_id, subject, body, template_id, scheduled_at }]);
    if (error) throw new Error(error.message);
    return data;
};

// Função para encontrar e-mails agendados
exports.getScheduledEmails = async () => {
    const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('sent', false);
    if (error) throw new Error(error.message);
    return data;
};

// Função para atualizar o status do e-mail
exports.updateEmailStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('emails')
        .update({ sent: status })
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
};
