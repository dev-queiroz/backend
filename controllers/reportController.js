const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.createReport = async (req, res) => {
  const { campaign_id, sent_count, open_count, click_count } = req.body;

  const { data, error } = await supabase
    .from('reports')
    .insert([{ campaign_id, sent_count, open_count, click_count }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
};

exports.getReports = async (req, res) => {
  const { campaign_id } = req.query;

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('campaign_id', campaign_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
