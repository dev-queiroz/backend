const supabase = require("../services/supabase");

exports.createEmail = async (
  user_id,
  subject,
  body,
  template_id,
  scheduled_at
) => {
  const { data, error } = await supabase
    .from("emails")
    .insert([{ user_id, subject, body, template_id, scheduled_at }]);

  if (error) throw error;
  return data[0];
};

exports.getEmails = async () => {
  const { data, error } = await supabase.from("emails").select("*");

  if (error) throw error;
  return data;
};
