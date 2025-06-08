const order = require('../../models/Order');
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        console.log("Mise à jour du statut de la commande");
        // Vérifier si la commande existe
        const orderToUpdate = await order.findById(id);
        if (!orderToUpdate) {
            return res.status(404).json({ success: false, message: "Commande non trouvée" });
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