//Importer les dépendances nécessaires
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Middleware d'authentification et d'autorisation

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ success: false, message: "Token manquant ou invalide" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Token invalide" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        req.user = user; 
        next(); 

    }
    catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Erreur serveur"});
    }

}

const admin = (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: "Accès refusé"})
    }
    next()

}

module.exports = {auth , admin};
    