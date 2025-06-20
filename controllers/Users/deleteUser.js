/**
 * delete
 =================================================================================================
 = Supprime un utilisateur de la base de données MongoDB à partir de son identifiant (_id).      =
 = Vérifie si l'identifiant est un ObjectId MongoDB valide (24 caractères hexadécimaux).         =
 = Recherche l'utilisateur par ID.                                                               =
 = Empêche la suppression d’un compte administrateur (role === 'admin').                         =
 * Supprime l'utilisateur s’il existe et n’est pas admin.                                        =
 =================================================================================================
 */

const User = require('../../models/Users');

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;

        // Vérification de la validité de l'identifiant MongoDB 
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Identifiant utilisateur invalide" });
        }

        //Recherche de l'utilisateur par son ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        
        // Protéger les comptes "admin"
        if (user.role === 'admin') {
            return res.status(403).json({ success: false, message: "Impossible de supprimer un administrateur" });
        }

        
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" });
    }
    catch(err){
        console.error(err);
         
         // Gestion des erreurs dues à un identifiant mal formé
         if (err.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Identifiant utilisateur invalide" });
        }

        return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

}
module.exports = deleteUser;
