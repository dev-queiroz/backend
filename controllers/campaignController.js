const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.createCampaign = async (req, res) => {
  const { user_id, name, content } = req.body;

  const { data, error } = await supabase
    .from('campaigns')
    .insert([{ user_id, name, content }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
};

exports.getCampaigns = async (req, res) => {
  const { user_id } = req.query;

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  const { data, error } = await supabase
    .from('campaigns')
    .update({ name, content })
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Campaign deleted successfully' });
};
