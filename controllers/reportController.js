// controllers/reportController.js
const { supabase } = require('../app');

// Função para listar relatórios de e-mails
exports.getReports = async (req, res) => {
    const { email_id } = req.query;

    const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('email_id', email_id);

    if (error) return res.status(400).json({ error: error.message });
    
    res.json(data);
};
