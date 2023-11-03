const express = require('express');
const bodyParser = require('body-parser');
const {leadRouter} = require('./routes/leadRoutes');
require("dotenv").config()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));



app.use('/leads', leadRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});