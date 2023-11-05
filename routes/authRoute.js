const express = require('express');
const authRouter = express.Router();
require("dotenv").config()

const clientID = process.env.clientID
const clientSecret=process.env.clientSecret
const redirectURI =process.env.redirectUri

const zohoOAuthURL = 'https://accounts.zoho.com/oauth/v2/auth';


authRouter.get('/Oauth', (req, res) => {
    // Redirect the user to the Zoho Login page
    const scope = 'ZohoCRM.users.ALL'; 
    const responseType = 'code';
    const accessType = 'offline';
  
    const authorizationURL = `${zohoOAuthURL}?scope=${scope}&client_id=${clientID}&response_type=${responseType}&access_type=${accessType}&redirect_uri=${redirectURI}`;
  
    res.redirect(authorizationURL);
});


authRouter.get('/callback', (req, res) => {
    // Extract the grant token from the URL
    const grantToken = req.query.code;
    // console.log(req.query)
    
  
    // Store the grant token in the session
    req.session.grantToken = grantToken;
  
    // Make a POST request to the Zoho token endpoint to exchange the grant token for access and refresh tokens
    axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret, // Replace with your actual client secret
        code: grantToken,
        redirect_uri: redirectURI,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log(response);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;


      // Store tokens in session
      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;
      req.session.token_expiration_time = response.data.token_expiration_time
  
      console.log(req.session)
    
      // For the sake of this example, we'll just send a response
      res.send(`Access Token: ${accessToken}, Refresh Token: ${refreshToken}`);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      res.send(error.message);
    });
    
});

module.exports={authRouter}