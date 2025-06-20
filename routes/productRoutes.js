/*
=====================================================================================
= Routes pour la gestion des produits :                                             =
= POST   /api/products        → Créer un nouveau produit                            =
= GET    /api/products        → Récupérer tous les produits                         =
= GET    /api/products/:id    → Récupérer un produit par son ID                     =
= PUT    /api/products/:id    → Mettre à jour un produit                            =
= DELETE /api/products/:id    → Supprimer un produit                                =
=====================================================================================
*/


//Importation du module Express et création d'un routeur
const express = require('express')
const router = express.Router()

//Middleware pour gérer les fichiers (images) envoyés avec les produits
const upload = require('../middleware/multer')



router.post('', upload,   require('../controllers/Products/create'))

router.get('',  require('../controllers/Products/getAll'))

router.get('/:id',  require('../controllers/Products/getOne'))

router.put('/:id',upload,  require('../controllers/Products/update'))

router.delete('/:id',  require('../controllers/Products/delete'))


module.exports = router