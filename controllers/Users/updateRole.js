const User = require('../../models/Users');

const updateRole = async (req, res) => {
    try{
        const userId = req.params.id;
        const { role } = req.body;

        // Vérification que le rôle est valide
        if (!role || !['accueil', 'preparateur', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Rôle invalide' });
        }

        // Mise à jour du rôle de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate( userId, { role }, { new: true});

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        return res.status(200).json({ message: 'Rôle mis à jour avec succès', user: updatedUser });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
}

module.exports = updateRole;