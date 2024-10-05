const express = require('express');
const mercadoLibreClient = require('../lib/mercadoLibreClient');
const router = express.Router();

// Ruta para solicitar el listado de categorías
router.get('/categories', async (req, res) => {
    const accessToken = req.session.accessToken;

    if (!accessToken) {
        return res.status(401).send('No autorizado');
    }

    try {
        const categories = await mercadoLibreClient.getCategories(accessToken);
        res.json(categories);
    } catch (error) {
        res.status(500).send('Error obteniendo categorías');
    }
});

// Ruta para manejar la autenticación de Mercado Libre
router.get('/auth/callback', async (req, res) => {
    const { code } = req.query; // El código de autorización viene en la query string

    try {
        const accessToken = await mercadoLibreClient.getAccessToken(code);
        
        // Guarda el token de acceso en la sesión
        req.session.accessToken = accessToken;

        res.send('Autenticación exitosa, puedes cerrar esta ventana.');
    } catch (error) {
        console.error('Error en el callback de autenticación:', error);
        res.status(500).send('Error en la autenticación');
    }
});

module.exports = router;
