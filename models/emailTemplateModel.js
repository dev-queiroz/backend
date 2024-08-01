const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EmailTemplateModel = {
  async create(user_id, name, subject, body) {
    const { data, error } = await supabase
      .from('email_templates')
      .insert([{ user_id, name, subject, body }]);
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(user_id) {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('email_templates')
      .update(updates)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = EmailTemplateModel;
