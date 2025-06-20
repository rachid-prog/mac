/*
==============================================================================================================
= Description des routes :                                                                                   =
= POST   /api/users/register      → Enregistrer un nouvel utilisateur                                        =
= POST   /api/users/login         → Authentifier un utilisateur (login)                                      =
= GET    /api/users               → Récupérer tous les utilisateurs (admin uniquement)                       =
= GET    /api/users/:id           → Récupérer un utilisateur par son ID (auth requis)                        =
= PUT    /api/users/:id           → Mettre à jour un utilisateur (auth requis)                               =
= DELETE /api/users/:id           → Supprimer un utilisateur (admin uniquement)                              =
= PUT    /api/users/:id/role      → Modifier le rôle d’un utilisateur (admin uniquement)                     =
==============================================================================================================
*/


// Importation du module Express et création d'un routeur
const express = require('express');
const router = express.Router();

//Importation des middlewares d'authentification et d'autorisation
const {auth, admin} = require('../middleware/authMiddleware');



// Routes pour l'enregistrement et la connexion des utilisateurs
router.post('/register', require('../controllers/Users/register'));
router.post('/login', require('../controllers/Users/login'));

// Routes pour la gestion des utilisateurs (nécessitent une authentification)
router.get('',auth, admin, require('../controllers/Users/getAll'));

router.get('/:id',auth, require('../controllers/Users/getOne'));

router.put('/:id', auth, require('../controllers/Users/update'));

router.delete('/:id', auth, admin, require('../controllers/Users/deleteUser'));

// Routes pour la gestion roles utilisateurs
router.put('/:id/role', auth, admin, require('../controllers/Users/updateRole'));



module.exports = router;