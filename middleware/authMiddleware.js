const User = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware d'authentification
 * Vérifie la présence d'un token JWT valide dans l'en-tête Authorization
 * et attache l'utilisateur authentifié à la requête (req.user)
 */

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "En-tête d'autorisation invalide" });
        }
         // Récupération du token
        const token = authHeader.split(' ')[1];

        // Vérification du token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Recherche de l'utilisateur par ID dans la BDD
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        
        // Injection de l'utilisateur dans la requête
        req.user = user;
        next();
    } catch (err) {
        console.error(err);

        // Gestion spécifique des erreurs JWT
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expiré" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Token invalide" });
        }

        //Erreur serveur
        return res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

/**
 * Middleware de contrôle d'accès admin
 * Vérifie que l'utilisateur a bien le rôle 'admin'
 */

const admin = (req, res, next) => {

    // Vérifie que l'utilisateur est attaché et a le rôle adéquat
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: "Accès refusé" });
    }
    next();
};

module.exports = { auth, admin };
