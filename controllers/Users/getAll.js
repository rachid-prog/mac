/**
* getall
 ===========================================================================================
 =   - Récupère la liste de tous les utilisateurs dans la base de données MongoDB.         =  
 =   - Exclut le champ `password` des résultats pour préserver la sécurité des données.    =
 =   - Renvoie une erreur si aucun utilisateur n'est trouvé (liste vide).                  =
 ===========================================================================================
 */

const User = require('../../models/Users')

const getAll = async (req, res) => {
    try {
         // Récupération de tous les utilisateurs, sans le champ `password` pour des raisons de sécurité
        const users = await User.find({}, '-password');
        
        // Vérification si la liste est vide ou aucun résultat
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "Aucun utilisateur trouvé" });
        }

        //Réponse OK avec la liste des utilisateurs
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}
module.exports = getAll;