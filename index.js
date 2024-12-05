const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
require('./config/db_pgSQL');


app.use(express.json());

// app.use rutas
// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  res.send("Hello World!. Welcome to Backend");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
