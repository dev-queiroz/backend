const { getSupabaseClient } = require("../db/database");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { EMAIL_USER, EMAIL_PASS } = process.env;

const supabase = getSupabaseClient();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }]);

    if (error) throw error;

    const { data: templates, error: templateError } = await supabase
      .from("templates")
      .select("html")
      .eq("id", "welcome-template-id");

    if (templateError) throw templateError;
    if (templates.length === 0)
      return res
        .status(404)
        .json({ message: "Template de boas-vindas não encontrado" });

    const welcomeTemplate = templates[0].html;
    const personalizedTemplate = welcomeTemplate.replace("{{name}}", name);

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Bem-vindo!",
      html: personalizedTemplate,
    });

    res.status(201).json({ message: "Usuário adicionado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (userError) throw userError;
    if (user.length === 0)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(401).json({ message: "Senha incorreta" });

    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("email", email);

    if (deleteError) throw deleteError;

    const { data: templates, error: templateError } = await supabase
      .from("templates")
      .select("html")
      .eq("id", "goodbye-template-id");

    if (templateError) throw templateError;
    if (templates.length === 0)
      return res
        .status(404)
        .json({ message: "Template de despedida não encontrado" });

    const goodbyeTemplate = templates[0].html;
    const personalizedTemplate = goodbyeTemplate.replace("{{email}}", email);

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Despedida",
      html: personalizedTemplate,
    });

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
