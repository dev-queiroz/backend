const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ReportModel = {
  async create(user_id, campaign_id, content) {
    const { data, error } = await supabase
      .from('reports')
      .insert([{ user_id, campaign_id, content }]);
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(user_id) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async findByCampaignId(campaign_id) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('campaign_id', campaign_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('reports')
      .update(updates)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('reports')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = ReportModel;
