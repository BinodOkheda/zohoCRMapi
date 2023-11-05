const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const {leadRouter} = require('./routes/leadRoute');
const {authRouter} = require("./routes/authRoute");
require("dotenv").config()

const app = express();
const port = process.env.port;

app.use(bodyParser.urlencoded({ extended: true }));


// Set up session management
app.use(
  session({
    secret:process.env.session_secret, 
    resave: true,
    saveUninitialized: true,
  })
);


app.use('/auth',authRouter);
app.use('/leads', leadRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});