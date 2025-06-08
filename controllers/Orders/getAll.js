const Order = require('../../models/Order');

const getAll = async (req, res) => {
    try {
        console.log('ok')
        const orders = await Order.find().populate('menus');
        
        if (!orders) {
            return res.status(404).json({ success: false, message: "Aucune commande trouvée" });
        }
        
        res.status(200).json({ success: true, message: "Commandes récupérées avec succès", orders });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: err.message });
        }
        
        if (err.name === "CastError") {
            return res.status(400).json({ message: err.message });
        }
        
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

module.exports = getAll