const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
require('./config/db_pgSQL');
const cors = require('cors')


app.use(express.json());

//Logger
const morgan = require("./middlewares/morgan")
app.use(morgan(':method :url :status - :response-time ms :body'));

app.use(cors({
  origin: ['http://localhost:5173', 'https://trydeployprueba.netlify.app'], // URL del front
  credentials: true
}));

// Rutas importadas
const adminRoutes = require("./routes/admin.routes");


// app.use rutas habilitadas
app.use('/api/admin', adminRoutes);

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  res.send("Hello World!. Welcome to Backend");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
