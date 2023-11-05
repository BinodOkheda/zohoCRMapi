const axios = require('axios');
require("dotenv").config()

// Function to check if the access token is expired
function isAccessTokenExpired(req) {
    const tokenExpirationTime = req.session.token_expiration_time || 0;
    const currentTime = Date.now();
    return currentTime >= tokenExpirationTime;
}

// Function to calculate the token expiration time
function calculateTokenExpirationTime(tokenData) {
    const currentTime = Date.now();
    return currentTime + (tokenData.expires_in * 1000);
}


// Function to refresh the access token using the refresh token
async function refreshAccessToken(refreshToken) {
    const tokenEndpoint = 'https://accounts.zoho.com/oauth/v2/token';
  
    try {
      const response = await axios.post(tokenEndpoint, null, {
        params: {
          grant_type: 'refresh_token',
          client_id: process.env.clientID, 
          client_secret: process.env.clientSecret,
          refresh_token: refreshToken,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }


const checkToken = async (req, res, next) => {


    const accessToken = req.session.access_token;
    const refreshToken = req.session.refresh_token;

    if (!accessToken) {
        return res.status(500).send('Zoho CRM authentication failed.');
    }




    // Check if the access token is expired
    if (isAccessTokenExpired(req)) {
        const refreshedToken = await refreshAccessToken(refreshToken);

        if (!refreshedToken || !refreshedToken.access_token) {
            return res.status(500).send('Failed to refresh the access token.');
        }

        req.session.access_token = refreshedToken.access_token;
        req.session.token_expiration_time = calculateTokenExpirationTime(refreshedToken);

        return next();
    } else {
        return next();
    }



}


module.exports = {checkToken}