//Importation des modules necessaires
require('dotenv').config()
const connexion = require('./database/connexion')
const cors = require('cors')
const upload = require('./middleware/multer')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const { auth, admin } = require('./middleware/authMiddleware')

//Définition de l'application Express
const express = require('express')

const app = express()

//Middelwear
app.use(express.json()).use(express.urlencoded({extended: true})).use(cors())

//definir dossier statique pour les images
app.use('/uploads', express.static('uploads'))

//Sécurisation de l'application avec Helmet
app.use(helmet())

//Limiter le nombre de requêtes pour éviter les abus
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
    message: "Trop de requêtes, veuillez réessayer plus tard."
});
app.use(limiter);

//Connexion à la base de données
connexion()

//Port d'écoute
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ console.log(`☻ En écoute sur http://localhost:${PORT} ☻`)})

//Les routes
app.use('/api/products', auth, admin,  upload, require('./routes/productRoutes'));

app.use('/api/menus', auth, admin, require('./routes/menuRoutes'))

app.use('/api/orders', require('./routes/orderRoutes'))

app.use('/api/users', require('./routes/userRoutes'))