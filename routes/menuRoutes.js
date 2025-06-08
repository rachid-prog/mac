//Importation des modules nécessaires
const express = require('express')
const router = express.Router()

/*
    Routes pour les menus
    - POST /api/menus : Créer un nouveau menu
    - GET /api/menus : Récupérer tous les menus
    - GET /api/menus/:id : Récupérer un menu par son ID
    - PUT /api/menus/:id : Mettre à jour un menu par son ID
    - DELETE /api/menus/:id : Supprimer un menu par son ID
*/

router.post('', require('../controllers/Menus/create'))

router.get('', require('../controllers/Menus/getAll'))

router.get('/:id', require('../controllers/Menus/getOne'))

router.put('/:id', require('../controllers/Menus/update'))

router.delete('/:id', require('../controllers/Menus/delete'))

module.exports = router