/* * 
 * description La récupération de l'utilisateur par ID
 * Le cas où l'utilisateur n'existe pas (404).
 * Les erreurs d'ID malformé (400, grâce au CastError).
 * Les erreurs serveur (500).
 */


const User = require('../../models/Users');

const getOne = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId, '-password'); // Exclude password field
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