/**
 * getOne
 * ==============================================================================
 =  - Récupère un utilisateur par son ID depuis la base de données MongoDB.     =
 =  - Exclut le champ "password" pour des raisons de sécurité.                  =
 =  - ID malformé (ex: non conforme à MongoDB ObjectId) → 400                   =
 =  - Erreurs internes du serveur → 500                                         =
 ==================================================================================
 */


const User = require('../../models/Users');

const getOne = async (req, res) => {
    try {
        const userId = req.params.id;

        // Vérification de la validité de l'identifiant MongoDB 
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Identifiant utilisateur invalide" });
        }
        
        // 🔍 Récupération de l'utilisateur sans le champ "password"
        const user = await User.findById(userId, '-password');

        // ❌ Utilisateur non trouvé
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.log(err);
        
         if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Identifiant utilisateur invalide" });
        }
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}

module.exports = getOne;