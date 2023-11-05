const axios = require('axios');
const qs = require('querystring');
require("dotenv").config()

// Define your Zoho CRM API credentials
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectUri = process.env.redirectUri;


// Create a lead in Zoho CRM
const createLeadInZoho = async (accessToken, leadData) => {
    try {
        const lead = {
            data: [
                {
                    Last_Name: leadData.name,
                    Email: leadData.email,
                    Phone: leadData.phone,
                },
            ],
        };

        const createLeadResponse = await axios.post('https://www.zohoapis.com/crm/v2/Leads', lead, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return createLeadResponse;
    } catch (error) {
        console.error('Zoho CRM lead creation error:', error);
        return null;
    }
};

// Fetch a list of leads from Zoho CRM
const fetchLeadsFromZoho = async (accessToken) => {
   
    try {
        const leadsResponse = await axios.get('https://www.zohoapis.com/crm/v2/Leads', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
       
        return leadsResponse;
    } catch (error) {
        console.error('Zoho CRM leads fetch error:', error);
        return null;
    }
};


// Update a lead in Zoho CRM
const updateLeadInZoho = async (accessToken, leadId, leadData) => {
    try {
        const leadUpdateResponse = await axios.put(`https://www.zohoapis.com/crm/v2/Leads/${leadId}`, leadData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return leadUpdateResponse;
    } catch (error) {
        console.error('Zoho CRM lead update error:', error);
        return null;
    }
};

// Delete a lead in Zoho CRM
const deleteLeadInZoho = async (accessToken, leadId) => {
    try {
        const leadDeleteResponse = await axios.delete(`https://www.zohoapis.com/crm/v2/Leads/${leadId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return leadDeleteResponse;
    } catch (error) {
        console.error('Zoho CRM lead delete error:', error);
        return null;
    }
};


module.exports = {  createLeadInZoho, fetchLeadsFromZoho, updateLeadInZoho, deleteLeadInZoho }