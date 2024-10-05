require('dotenv').config();
const express = require('express');
const session = require('express-session');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Configurar las sesiones
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// Rutas de la API
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
