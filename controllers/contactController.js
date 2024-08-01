const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.createContact = async (req, res) => {
  const { user_id, email, first_name, last_name } = req.body;

  const { data, error } = await supabase
    .from('contacts')
    .insert([{ user_id, email, first_name, last_name }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
};

exports.getContacts = async (req, res) => {
  const { user_id } = req.query;

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name } = req.body;

  const { data, error } = await supabase
    .from('contacts')
    .update({ email, first_name, last_name })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Contact deleted successfully' });
};
