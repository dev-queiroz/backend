const { createReport, getReports } = require('../models/reportModel');

exports.createReport = async (req, res) => {
    const { email_id, status, recipient_email, opened_at, clicked_at } = req.body;

    try {
        const report = await createReport(email_id, status, recipient_email, opened_at, clicked_at);
        res.status(201).json({ report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReports = async (req, res) => {
    const { email_id } = req.query;

    try {
        const reports = await getReports(email_id);
        res.json({ reports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
