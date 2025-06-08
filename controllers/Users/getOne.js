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
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
}

module.exports = getOne;