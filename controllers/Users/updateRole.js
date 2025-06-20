/**
   updateRole
===============================================================================================================================
=   Met à jour le rôle d’un utilisateur spécifique via son ID.                                                                =
=  Valide que le champ `role` est fourni et qu’il fait partie des rôles autorisés :['accueil', 'preparateur', 'admin']        =
=  Met à jour le rôle de l'utilisateur dans la base de données.                                                               =
===============================================================================================================================
 */

const User = require('../../models/Users');
const mongoose = require('mongoose')

const updateRole = async (req, res) => {
    try{
        const userId = req.params.id;
        const { role } = req.body;

         // Vérifier que l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID utilisateur invalide' });
        }

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