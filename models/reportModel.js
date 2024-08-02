const { supabase } = require("../app");

exports.createReport = async (
  email_id,
  status,
  recipient_email,
  opened_at,
  clicked_at
) => {
  const { data, error } = await supabase
    .from("reports")
    .insert([{ email_id, status, recipient_email, opened_at, clicked_at }]);

  if (error) throw error;
  return data[0];
};

exports.getReports = async (email_id) => {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("email_id", email_id);

  if (error) throw error;
  return data;
};
