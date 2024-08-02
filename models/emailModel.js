const { supabase } = require('../app');

exports.createEmail = async (user_id, subject, body, template_id, scheduled_at) => {
    const { data, error } = await supabase
        .from('emails')
        .insert([{ user_id, subject, body, template_id, scheduled_at }]);

    if (error) throw error;
    return data[0];
};

exports.getScheduledEmails = async () => {
    const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('status', 'scheduled');

    if (error) throw error;
    return data;
};

exports.updateEmailStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('emails')
        .update({ status })
        .eq('id', id);

    if (error) throw error;
    return data[0];
};
