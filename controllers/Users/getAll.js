const User = require('../../models/Users')

const getAll = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        if (!users) {
            return res.status(404).json({ success: false, message: "Aucun utilisateur trouvé" });
        }
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}
module.exports = getAll;