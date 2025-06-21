//Chargement des variables d'environnement depuis .env
require('dotenv').config({ path: '.env' });

const connexion = require('./database/connexion')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const { auth, admin } = require('./middleware/authMiddleware')
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html')

const allowedOrigins = ['https://mac-k9fa.onrender.com', 'http://localhost:3000'];
const swaggerDocs = require('./swagger');

//Définition de l'application Express
const express = require('express')
const app = express()

// Ajoute la route /api-docs   [http://localhost:3000/api-docs/]
if (process.env.NODE_ENV === 'development') {
  swaggerDocs(app);
}

// Middlewares globaux
app.use(express.json({ limit: '10kb' })) // Limite de taille pour les requêtes JSON
app.use(express.urlencoded({extended: true, limit: '10kb'})) // Limite de taille pour les requêtes URL-encodées


app.use(helmet()); // Protection contre les attaques courantes (XSS, clickjacking, etc.)

// Middleware pour nettoyer toutes les données du body [remplace xxs]
function sanitizeMiddleware(req, res, next) {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key]);
      }
    }
  }
  next();
}

app.use(sanitizeMiddleware);

app.use(cors({
    origin: allowedOrigins, // Autoriser les origines spécifiques
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    credentials: true // Autoriser les cookies et les en-têtes d'autorisation
}))



// Middleware pour nettoyer les requêtes MongooDB probbléme avec app.use(mongoSanitize()}
app.use((req, res, next) => {
  try {
    // Nettoie req.query sans la remplacer (on met le résultat dans req.sanitizedQuery)
    req.sanitizedQuery = mongoSanitize.sanitize(req.query);

    // Nettoie req.body et req.params directement (pas de problème à les modifier)
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.params);
  } catch (err) {
    console.error('Erreur lors du nettoyage mongoSanitize:', err);
    // Continue quand même la requête
  }
  next(); // Passer l'erreur au middleware d'erreur express
});




//definir dossier statique pour les images
app.use('/uploads', express.static('uploads'))

console.log(`Environnement en cours : ${process.env.NODE_ENV}`);

//Logger uniquement en développement
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//Limiter le nombre de requêtes pour éviter les abus [5 requêtes/15 min par IP]
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

