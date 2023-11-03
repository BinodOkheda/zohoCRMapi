const express = require('express');
const leadRouter = express.Router();
const { authenticateWithZoho, createLeadInZoho, fetchLeadsFromZoho, fetchLeadFromZoho, updateLeadInZoho, deleteLeadInZoho } = require('../controllers/leadController');

// Route for creating a lead
leadRouter.post('/submit', async (req, res) => {
    const leadData = req.body;
    const authResponse = await authenticateWithZoho();

    if (!authResponse || !authResponse.access_token) {
        return res.status(500).send('Zoho CRM authentication failed.');
    }

    const createLeadResponse = await createLeadInZoho(authResponse.access_token, leadData);

    if (createLeadResponse.data[0].code === '3000') {
        // Lead creation succeeded
        res.redirect('/leads');
    } else {
        // Lead creation failed
        res.status(500).send('Failed to create lead in Zoho CRM.');
    }
});


// Route for listing all leads in Zoho CRM
leadRouter.get('/leads', async (req, res) => {
    try {
        const authResponse = await authenticateWithZoho();
        console.log(authResponse)
        if (!authResponse || !authResponse.access_token) {
            return res.status(500).send('Zoho CRM authentication failed.');
        }
        
        const leads = await fetchLeadsFromZoho(authResponse.access_token);
        res.send(leads.data.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});

// Route for editing a lead
leadRouter.get('/leads/edit/:leadId', async (req, res) => {
    try {
        const leadId = req.params.leadId;

        const authResponse = await authenticateWithZoho();
        if (!authResponse || !authResponse.access_token) {
            return res.status(500).send('Zoho CRM authentication failed.');
        }

        const lead = await fetchLeadFromZoho(authResponse.access_token, leadId);

        if (lead) {
            res.send(lead.data.data);
        } else {
            res.status(404).send('Lead not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});

// Route for updating a lead
leadRouter.post('/leads/edit/:leadId', async (req, res) => {
    try {
        const leadId = req.params.leadId;
        const leadData = req.body;

        const authResponse = await authenticateWithZoho();
        if (!authResponse || !authResponse.access_token) {
            return res.status(500).send('Zoho CRM authentication failed.');
        }

        const updateResponse = await updateLeadInZoho(authResponse.access_token, leadId, leadData);

        if (updateResponse.data.data[0].code === '3000') {
            // Lead update succeeded
            res.redirect('/leads');
        } else {
            // Lead update failed
            res.status(500).send('Failed to update lead in Zoho CRM.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});

// Route for deleting a lead
leadRouter.get('/leads/delete/:leadId', async (req, res) => {
    try {
        const leadId = req.params.leadId;

        const authResponse = await authenticateWithZoho();
        if (!authResponse || !authResponse.access_token) {
            return res.status(500).send('Zoho CRM authentication failed.');
        }

        const deleteResponse = await deleteLeadInZoho(authResponse.access_token, leadId);

        if (deleteResponse.data.data[0].code === '3000') {
            // Lead deletion succeeded
            res.redirect('/leads');
        } else {
            // Lead deletion failed
            res.status(500).send('Failed to delete lead in Zoho CRM.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});








module.exports = { leadRouter };
