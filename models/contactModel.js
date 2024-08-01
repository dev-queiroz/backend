const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ContactModel = {
  async create(user_id, email, first_name, last_name) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ user_id, email, first_name, last_name }]);
    if (error) throw new Error(error.message);
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async findByUserId(user_id) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = ContactModel;
