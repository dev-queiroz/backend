// controllers/contactController.js
const { createContact, getContacts, updateContact, deleteContact } = require('../models/contactModel');

exports.createContact = async (req, res) => {
    const { user_id, name, email, tags } = req.body;

    try {
        const contact = await createContact(user_id, name, email, tags);
        res.status(201).json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    const { user_id } = req.query;

    try {
        const contacts = await getContacts(user_id);
        res.json({ contacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, tags } = req.body;

    try {
        const contact = await updateContact(id, name, email, tags);
        res.json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const contact = await deleteContact(id);
        res.json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
