//Importation modules nécessaires
const mongoose = require('mongoose');
require('dotenv').config();

// Fonction de connexion à la base de données MongoDB
const connexion = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`☻ Connexion à MongoDB réussie ☻ [ ${con.connection.host} ${con.connection.port} ${con.connection.name} ]`);
    } catch (err) {
        console.error('❌ Erreur de connexion à MongoDB :', err.message);
        process.exit(1); // Arrêter le processus en cas d'échec de connexion
    }
}

module.exports = connexion;