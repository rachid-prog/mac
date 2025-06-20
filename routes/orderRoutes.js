/*
=====================================================================================================
= Description des routes pour la gestion des commandes (orders) :                                   =
= POST   /api/orders             → Créer une nouvelle commande                                      =
= GET    /api/orders             → Récupérer toutes les commandes                                   =
= GET    /api/orders/:id         → Récupérer une commande par ID                                    =
= PUT    /api/orders/:id         → Modifier une commande existante                                  =
= DELETE /api/orders/:id         → Supprimer une commande par ID                                    =
= PUT    /api/orders/:id/status  → Mettre à jour uniquement le statut d’une commande                =
=====================================================================================================
*/


// Importation du module Express et création du routeur
const express = require('express')
const router = express.Router()



router.post('', require('../controllers/Orders/create'))
router.get('',  require('../controllers/Orders/getAll'))
router.delete('/:id', require('../controllers/Orders/deleteOrder'))
router.get('/:id', require('../controllers/Orders/getOne'))
router.put('/:id', require('../controllers/Orders/update'))

//modifier le statut d'une commande
router.put('/:id/status', require('../controllers/Orders/updateStatus'))

module.exports = router