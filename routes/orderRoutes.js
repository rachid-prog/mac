//Importer les modules nécessaires
const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/authMiddleware')
/*
    Routes pour les commandes
    - POST /api/orders : Créer une nouvelle commande
    - GET /api/orders : Récupérer toutes les commandes
    - GET /api/orders/:id : Récupérer une commande par son ID
    - PUT /api/orders/:id : Mettre à jour une commande par son ID
    - DELETE /api/orders/:id : Supprimer une commande par son ID
    - PUT /api/orders/:id/status : Mettre à jour le statut d'une commande
*/

router.post('', auth, require('../controllers/Orders/create'))
router.get('', auth, require('../controllers/Orders/getAll'))
router.delete('/:id',auth, require('../controllers/Orders/deleteOrder'))
router.get('/:id',auth, require('../controllers/Orders/getOne'))
router.put('/:id',auth, require('../controllers/Orders/update'))

//modifier le statut d'une commande
router.put('/:id/status', require('../controllers/Orders/updateStatus'))

module.exports = router