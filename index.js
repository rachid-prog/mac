//Chargement des variables d'environnement depuis .env
require('dotenv').config({ path: '.env' });

const connexion = require('./database/connexion')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const { auth, admin } = require('./middleware/authMiddleware')
const morgan = require('morgan');

//Définition de l'application Express
const express = require('express')
const app = express()

// Middlewares globaux
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet()) //Sécurisation de l'application avec Helmet
app.use(cors())

//definir dossier statique pour les images
app.use('/uploads', express.static('uploads'))

console.log(`Environnement en cours : ${process.env.NODE_ENV}`);

//Logger uniquement en développement
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//Limiter le nombre de requêtes pour éviter les abus
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes
    message: "Trop de requêtes, veuillez réessayer plus tard."
});
app.use(limiter);

//Connexion à la base de données
connexion()


// Routes produits - uniquement accessibles aux admins
app.use('/api/products', auth, admin,  require('./routes/productRoutes'));
app.use('/api/menus', auth, admin, require('./routes/menuRoutes'))

//Routes orders -uniquement accessibles aux admins et acceuils
app.use('/api/orders',auth, require('./routes/orderRoutes'))

//register et login par admins/acceuil et preparateur. Suprimer, modifier et mise a jour par admin 
app.use('/api/users', require('./routes/userRoutes'))

//Erreur 404 pour les routes non trouvées
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route non trouvée" });
});

//Middleware de gestion des erreurs internes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Erreur interne du serveur" });
});

//Port d'écoute
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ console.log(`✅ En écoute sur 🌐http://localhost:${PORT} `)})

// Exporter l'application pour les tests
module.exports = app;

