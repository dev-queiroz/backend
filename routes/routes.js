const express = require('express');
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController');
const emailController = require('../controllers/emailController');
const reportController = require('../controllers/reportController');

const router = express.Router();

// Rotas de autenticação
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Rotas de contatos
router.post('/contacts', contactController.createContact);
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

// Rotas de e-mails
router.post('/emails', emailController.createEmail);
router.get('/emails', emailController.getScheduledEmails);
router.put('/emails/:id', emailController.updateEmailStatus);

// Rotas de relatórios
router.post('/reports', reportController.createReport);
router.get('/reports', reportController.getReports);

module.exports = router;
