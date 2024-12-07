const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
<<<<<<< HEAD
require('./schemas/associations');
require('./config/sqlConnection');
=======
require('./config/db_pgSQL');
const cors = require('cors')

>>>>>>> 718ca9cb77ad6f7e68b8b3f3f737b258d6b78d70

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://trydeployprueba.netlify.app'], // URL del front
  credentials: true
}));

// app.use rutas
// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  res.send("Hello World!. Welcome to Backend");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

