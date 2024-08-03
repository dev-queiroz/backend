require('dotenv').config();
const { getSupabaseClient } = require("../db/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

const supabase = getSupabaseClient();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.listTemplates = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const { data, error } = await supabase.from("templates").select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addTemplate = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const { title, html } = req.body;

    const { data, error } = await supabase
      .from("templates")
      .insert([{ title, html }]);

    if (error) throw error;

    res.status(201).json({ message: "Template adicionado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const { id, title, html } = req.body;

    const { data, error } = await supabase
      .from("templates")
      .update({ title, html })
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({ message: "Template atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const { id } = req.body;

    const { data, error } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);

    if (error) throw error;

    await transporter.sendMail({
      from: EMAIL_USER,
      to: decoded.email,
      subject: "Template Deletado",
      text: `O template com ID ${id} foi deletado com sucesso.`,
    });

    res.status(200).json({ message: "Template deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
