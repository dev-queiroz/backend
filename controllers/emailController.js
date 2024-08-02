const { createEmail, getScheduledEmails, updateEmailStatus } = require('../models/emailModel');

exports.createEmail = async (req, res) => {
    const { user_id, subject, body, template_id, scheduled_at } = req.body;

    try {
        const email = await createEmail(user_id, subject, body, template_id, scheduled_at);
        res.status(201).json({ email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getScheduledEmails = async (req, res) => {
    try {
        const emails = await getScheduledEmails();
        res.json({ emails });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmailStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const email = await updateEmailStatus(id, status);
        res.json({ email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
