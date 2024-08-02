const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
  const { email } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Confirmação de E-mail',
      html: `<h1>Bem-vindo!</h1><p>Obrigado por se inscrever. Este é um e-mail de confirmação.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar e-mail', error });
  }
};
