// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de gestion de restaurant',
      version: '1.0.0',
      description: 'Documentation de l’API pour le projet de restaurant (produits, menus, commandes, utilisateurs)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
      {
        url: 'https://mac-k9fa.onrender.com',
        description: 'Serveur de production',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers tes routes
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
