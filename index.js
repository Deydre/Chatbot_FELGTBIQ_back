const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
require('./schemas/associations');
require('./config/sqlConnection');

app.use(express.json());

// app.use rutas

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

