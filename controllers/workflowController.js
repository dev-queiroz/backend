const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.createWorkflow = async (req, res) => {
  const { user_id, name, description, steps } = req.body;

  const { data, error } = await supabase
    .from('workflows')
    .insert([{ user_id, name, description, steps }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
};

exports.getWorkflows = async (req, res) => {
  const { user_id } = req.query;

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.updateWorkflow = async (req, res) => {
  const { id } = req.params;
  const { name, description, steps } = req.body;

  const { data, error } = await supabase
    .from('workflows')
    .update({ name, description, steps })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.deleteWorkflow = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('workflows')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Workflow deleted successfully' });
};
