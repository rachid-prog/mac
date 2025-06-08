const User = require('../../models/Users');

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

}
module.exports = deleteUser;
