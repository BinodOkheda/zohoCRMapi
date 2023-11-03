const axios = require('axios');
const qs = require('querystring');
require("dotenv").config()

// Define your Zoho CRM API credentials
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectUri = process.env.redirectUri;





const authenticateWithZoho = async () => {

    try {
        const authResponse = await axios.post('https://accounts.zoho.com/oauth/v2/token', qs.stringify({
            code: '1000.530214f6faf91e9c272fff59d6aabf4b.4e03367c02e79fd4ba2badc5f6033ad6', // The authorization code from the OAuth flow
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }));

        console.log(authResponse.data)
        return authResponse.data;
    } catch (error) {
        console.error('Zoho CRM authentication error:', error);
        return null;
    }
};



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

// Fetch a single lead from Zoho CRM
const fetchLeadFromZoho = async (accessToken, leadId) => {
    try {
        const leadResponse = await axios.get(`https://www.zohoapis.com/crm/v2/Leads/${leadId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return leadResponse;
    } catch (error) {
        console.error('Zoho CRM lead fetch error:', error);
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


module.exports = { authenticateWithZoho, createLeadInZoho, fetchLeadsFromZoho, fetchLeadFromZoho, updateLeadInZoho, deleteLeadInZoho }