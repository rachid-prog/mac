//Importation des modules necessaires
require('dotenv').config()
const connexion = require('./database/connexion')
const cors = require('cors')
const upload = require('./middleware/multer')


//Définition de l'application Express
const express = require('express')
const app = express()

//Middelwear
app.use(express.json()).use(express.urlencoded({extended: true})).use(cors())

//definir dossier statique pour les images
app.use('/uploads', express.static('uploads'))

//Connexion à la base de données
connexion()

//Port d'écoute
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ console.log(`☻ En écoute sur http://localhost:${PORT} ☻`)})

//Les routes
app.use('/api/products', upload, require('./routes/productRoutes'));

app.use('/api/menus',  require('./routes/menuRoutes'))

app.use('/api/orders', require('./routes/orderRoutes'))

app.use('/api/users', require('./routes/userRoutes'))