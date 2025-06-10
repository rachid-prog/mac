const Order = require('../../models/Order');

const getAll = async (req, res) => {
    try {
        
        const orders = await Order.find().populate({ path: 'menus',select: 'name -_id'  }).populate({ path: 'user', select: 'name  -_id' })
        
        if (!orders ||  orders.length === 0 ) {
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