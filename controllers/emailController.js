// controllers/emailController.js
const nodemailer = require('nodemailer');
const { supabase } = require('../app');

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
    service: 'SendGrid', // ou outro serviço de e-mail
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Função para criar uma nova campanha de e-mail
exports.createCampaign = async (req, res) => {
    const { user_id, subject, body, template_id, scheduled_at } = req.body;

    const { data, error } = await supabase
        .from('emails')
        .insert([{ user_id, subject, body, template_id, scheduled_at }]);

    if (error) return res.status(400).json({ error: error.message });
    
    res.status(201).json({ message: 'Campanha de e-mail criada com sucesso!' });
};

// Função para enviar e-mails agendados
exports.sendScheduledEmails = async () => {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from('emails')
        .select('*')
        .lt('scheduled_at', now)
        .eq('sent', false);

    if (error) return console.error('Erro ao buscar e-mails agendados:', error.message);

    data.forEach(async (email) => {
        // Enviar e-mail
        const mailOptions = {
            from: 'your-email@example.com',
            to: email.recipient_email,
            subject: email.subject,
            html: email.body
        };

        try {
            await transporter.sendMail(mailOptions);

            // Atualizar status como enviado
            await supabase
                .from('emails')
                .update({ sent: true })
                .eq('id', email.id);
        } catch (err) {
            console.error('Erro ao enviar e-mail:', err.message);
        }
    });
};
