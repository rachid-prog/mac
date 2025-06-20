//Chargement des variables d'environnement depuis .env
require('dotenv').config({ path: '.env' });

const connexion = require('./database/connexion')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const { auth, admin } = require('./middleware/authMiddleware')
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const allowedOrigins = ['https://mac-k9fa.onrender.com', 'http://localhost:3000'];

//Définition de l'application Express
const express = require('express')
const app = express()

// Middlewares globaux
app.use(express.json({ limit: '10kb' })) // Limite de taille pour les requêtes JSON
app.use(express.urlencoded({extended: true, limit: '10kb'})) // Limite de taille pour les requêtes URL-encodées
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com'],   // par ex. autoriser les scripts hébergés ailleurs (CDN)
      styleSrc: ["'self'", 'https:', 'https://fonts.googleapis.com'], // par ex. autoriser styles hébergés ailleurs (CDN)
      imgSrc: ["'self'", 'data:', 'blob:', 'https://mac-k9fa.onrender.com'], // images sûres
      connectSrc: ["'self'"], // autoriser les requêtes XHR/WebSocket vers le serveur uniquement
      objectSrc: ["'none'"], // désactiver les plugins Flash, etc.
      upgradeInsecureRequests: [], // upgrade http vers https
    },
  })
);

app.use(cors({
    origin: allowedOrigins, // Autoriser les origines spécifiques
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    credentials: true // Autoriser les cookies et les en-têtes d'autorisation
}))
app.use(mongoSanitize()) //Protection contre les attaques NoSQL
app.use(xssClean()); //Protection contre les attaques XSS

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
    max: 5, // Limite chaque IP à 5 requêtes
    message: "Trop de requêtes, veuillez réessayer plus tard."
});
app.use('/api/auth/login', limiter);
app.use('/api/auth/register', limiter);

app.disable('x-powered-by'); // Désactiver l'en-tête X-Powered-By pour des raisons de sécurité

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

