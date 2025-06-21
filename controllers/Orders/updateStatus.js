const mongoose = require('mongoose')

const order = require('../../models/Order');
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userRole = req.user?.role;
    //Status autorisées par rôle
    const rolePermissions = {
        acceuil: ['en attente', 'livré'],
        superviseur: ['préparé'],
        admin: ['en attente', 'préparé', 'livré'],
    }


    try {
         // 🔒 Vérifier que l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "ID de commande invalide",
            });
        }

        
        // Vérifier si la commande existe
        const orderToUpdate = await order.findById(id);
        if (!orderToUpdate) {
            return res.status(404).json({ success: false, message: "Commande non trouvée" });
        }
        // Vérifier si l'utilisateur a le droit de modifier le statut
        if (!rolePermissions[userRole] || !rolePermissions[userRole].includes(status)) {
            return res.status(403).json({ success: false, message: "Vous n'avez pas le droit de modifier ce statut" });
        }

        // ✅ Éviter les mises à jour inutiles [Pas de save() inutile si le statut est inchangé]
            if (orderToUpdate.status === status) {
            return res.status(200).json({
                success: true,
                message: "Le statut est déjà à jour",
                order: orderToUpdate,
            });
            }

        // Mettre à jour le statut de la commande
        orderToUpdate.status = status;
        await orderToUpdate.save();

        res.status(200).json({ success: true, message: "Statut de la commande mis à jour", order: orderToUpdate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};
module.exports = updateStatus;