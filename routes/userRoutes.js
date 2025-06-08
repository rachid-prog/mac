//Importer les modules nécessaires
const express = require('express');
const router = express.Router();

// Importation des middlewares d'authentification et d'autorisation
const {auth, admin} = require('../middleware/authMiddleware');

/*
    Routes pour les utilisateurs
    - POST /api/users/register : Enregistrer un nouvel utilisateur
    - POST /api/users/login : Authentifier un utilisateur
    - GET /api/users : Récupérer tous les utilisateurs (admin)
    - GET /api/users/:id : Récupérer un utilisateur par son ID
    - PUT /api/users/:id : Mettre à jour un utilisateur par son ID
    - DELETE /api/users/:id : Supprimer un utilisateur par son ID
*/

// Routes pour l'enregistrement et la connexion des utilisateurs
router.post('/register', require('../controllers/Users/register'));
router.post('/login', require('../controllers/Users/login'));

// Routes pour la gestion des utilisateurs (nécessitent une authentification)
router.get('',auth, admin, require('../controllers/Users/getAll'));

router.get('/:id',auth, require('../controllers/Users/getOne'));

router.put('/:id', auth, require('../controllers/Users/update'));

router.delete('/:id', auth, require('../controllers/Users/deleteUser'));



module.exports = router;