/*
======================================================================================
= Définition des routes pour la gestion des menus :                                  =
= POST   /api/menus        → Créer un nouveau menu                                   =
= GET    /api/menus        → Récupérer tous les menus                                =
= GET    /api/menus/:id    → Récupérer un menu spécifique par son ID                 =
= PUT    /api/menus/:id    → Modifier un menu par son ID                             =
= DELETE /api/menus/:id    → Supprimer un menu par son ID                            =
======================================================================================
*/


//Importation du module Express et création d'un routeur
const express = require('express')
const router = express.Router()


//POST /api/menus
router.post('', require('../controllers/Menus/create'))

//GET /api/menus
router.get('', require('../controllers/Menus/getAll'))

//GET /api/menus/:id
router.get('/:id', require('../controllers/Menus/getOne'))

//PUT /api/menus/:id
router.put('/:id', require('../controllers/Menus/update'))

//DELETE /api/menus/:id
router.delete('/:id', require('../controllers/Menus/delete'))

module.exports = router