const express = require('express');
const authController = require('../controllers/authController');
const campaignController = require('../controllers/campaignController');
const contactController = require('../controllers/contactController');
const emailTemplateController = require('../controllers/emailTemplateController');
const reportController = require('../controllers/reportController');
const workflowController = require('../controllers/workflowController');

const router = express.Router();

// Rotas de autenticação
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Rotas de campanhas
router.post('/campaigns', campaignController.createCampaign);
router.get('/campaigns', campaignController.getCampaigns);
router.put('/campaigns/:id', campaignController.updateCampaign);
router.delete('/campaigns/:id', campaignController.deleteCampaign);

// Rotas de contatos
router.post('/contacts', contactController.createContact);
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id', contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);

// Rotas de templates de e-mail
router.post('/email-templates', emailTemplateController.createTemplate);
router.get('/email-templates', emailTemplateController.getTemplates);
router.put('/email-templates/:id', emailTemplateController.updateTemplate);
router.delete('/email-templates/:id', emailTemplateController.deleteTemplate);

// Rotas de relatórios
router.post('/reports', reportController.createReport);
router.get('/reports', reportController.getReports);

// Rotas de fluxos de trabalho
router.post('/workflows', workflowController.createWorkflow);
router.get('/workflows', workflowController.getWorkflows);
router.put('/workflows/:id', workflowController.updateWorkflow);
router.delete('/workflows/:id', workflowController.deleteWorkflow);

module.exports = router;
