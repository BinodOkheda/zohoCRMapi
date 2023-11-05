const express = require('express');
const leadRouter = express.Router();
const {  createLeadInZoho, fetchLeadsFromZoho, updateLeadInZoho, deleteLeadInZoho } = require('../controllers/leadController');
const { checkToken } = require("../middleware/checkToken.middleware")
require("dotenv").config()

// Route for creating a lead
leadRouter.post('/submit', checkToken, async (req, res) => {
    try {

        const leadData = req.body;
        const access_token = req.session.access_token

        const createLeadResponse = await createLeadInZoho(access_token, leadData);

        if (createLeadResponse.data[0].code === '3000') {
            // Lead creation succeeded
            res.redirect('/leads');
        } else {
            // Lead creation failed
            res.status(500).send('Failed to create lead in Zoho CRM.');
        }

    } catch (error) {
        res.send('Zoho CRM lead creation error:', error.message)
        return null;
    }

});


// Route for listing all leads in Zoho CRM
leadRouter.get('/leads', checkToken, async (req, res) => {
    try {
        const access_token = req.session.access_token;
        const leads = await fetchLeadsFromZoho(access_token);

        res.send(leads.data.data);

    } catch (error) {
        console.error('Zoho CRM lead retrieval error:', error);
        res.status(500).send('An error occurred.');
    }
});


// Route for updating a lead
leadRouter.post('/leads/edit/:leadId', checkToken, async (req, res) => {

    try {
        const leadId = req.params.leadId;
        const leadData = req.body;
        const access_token = req.session.access_token;


        const updateResponse = await updateLeadInZoho(access_token, leadId, leadData);

        if (updateResponse.data.data[0].code === '3000') {
            // Lead update succeeded
            res.redirect('/leads');
        } else {
            // Lead update failed
            res.status(500).send('Failed to update lead in Zoho CRM.');
        }
    } catch (error) {
        console.error('Zoho CRM lead update error:', error);
        res.status(500).send('An error occurred.');
    }

});

// Route for deleting a lead
leadRouter.get('/leads/delete/:leadId', checkToken, async (req, res) => {

    try {
        const leadId = req.params.leadId;
        const access_token = req.session.access_token;

        const deleteResponse = await deleteLeadInZoho(access_token, leadId);

        if (deleteResponse.data.data[0].code === '3000') {
            // Lead deletion succeeded
            res.redirect('/leads');
        } else {
            // Lead deletion failed
            res.status(500).send('Failed to delete lead in Zoho CRM.');
        }
    } catch (error) {
        console.error('Zoho CRM lead deletion error:', error);
        res.status(500).send('An error occurred.');
    }

});


module.exports = { leadRouter };
