const supabase = require("../services/supabase");

exports.createContact = async (user_id, name, email, tags) => {
  const { data, error } = await supabase
    .from("contacts")
    .insert([{ user_id, name, email, tags }]);

  if (error) throw error;
  return data[0];
};

exports.getContacts = async (user_id) => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;
  return data;
};

exports.updateContact = async (id, name, email, tags) => {
  const { data, error } = await supabase
    .from("contacts")
    .update({ name, email, tags })
    .eq("id", id);

  if (error) throw error;
  return data[0];
};

exports.deleteContact = async (id) => {
  const { data, error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) throw error;
  return data[0];
};
