const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.createTemplate = async (req, res) => {
  const { user_id, name, subject, body } = req.body;

  const { data, error } = await supabase
    .from('email_templates')
    .insert([{ user_id, name, subject, body }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
};

exports.getTemplates = async (req, res) => {
  const { user_id } = req.query;

  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { name, subject, body } = req.body;

  const { data, error } = await supabase
    .from('email_templates')
    .update({ name, subject, body })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('email_templates')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Template deleted successfully' });
};
