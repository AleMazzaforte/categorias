const axios = require('axios');
const apiUrl = 'https://api.mercadolibre.com';

const clientId = process.env.ML_CLIENT_ID;
const clientSecret = process.env.ML_CLIENT_SECRET;
const redirectUri = process.env.ML_REDIRECT_URI;

// Función para obtener el token de acceso usando el código de autorización
module.exports = {
    getAccessToken: async (code) => {
        try {
            const response = await axios.post(`${apiUrl}/oauth/token`, {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error obteniendo el token de acceso:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Función para obtener el listado de categorías
    getCategories: async (accessToken) => {
        try {
            const response = await axios.get(`${apiUrl}/sites/MLA/categories`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error obteniendo categorías:', error.response ? error.response.data : error.message);
            throw error;
        }
    },


   
};
