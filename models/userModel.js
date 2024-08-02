const supabase = require("../services/supabase");

exports.createUser = async (email, password_hash) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password_hash }]);

  if (error) throw error;
  return data[0];
};

exports.findByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data;
};
