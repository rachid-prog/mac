//Importer les modules nécessaires
const express = require('express')
const router = express.Router()

/*
    Routes pour les produits
    - POST /api/products : Créer un nouveau produit
    - GET /api/products : Récupérer tous les produits
    - GET /api/products/:id : Récupérer un produit par son ID
    - PUT /api/products/:id : Mettre à jour un produit par son ID
    - DELETE /api/products/:id : Supprimer un produit par son ID
*/


router.post('',  require('../controllers/Products/create'))

router.get('', require('../controllers/Products/getAll'))

router.get('/:id', require('../controllers/Products/getOne'))

router.put('/:id', require('../controllers/Products/update'))

router.delete('/:id', require('../controllers/Products/delete'))


module.exports = router