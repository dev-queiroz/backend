const { getSupabaseClient } = require("../db/database");
const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;

const supabase = getSupabaseClient();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.sendBroadcast = async (req, res) => {
  try {
    const { templateId } = req.body;

    const { data: templates, error: templateError } = await supabase
      .from("templates")
      .select("html")
      .eq("id", templateId);

    if (templateError) throw templateError;
    if (templates.length === 0)
      return res.status(404).json({ message: "Template não encontrado" });

    const template = templates[0].html;

    const { data: users, error: userError } = await supabase
      .from("users")
      .select("email");

    if (userError) throw userError;

    const emailPromises = users.map((user) =>
      transporter.sendMail({
        from: EMAIL_USER,
        to: user.email,
        subject: "Mensagem em massa",
        html: template,
      })
    );

    await Promise.all(emailPromises);

    res.status(200).json({ message: "E-mails enviados com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
