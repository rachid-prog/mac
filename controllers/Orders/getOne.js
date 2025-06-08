const Order = require('../../models/Order')

const getOne = async (req, res) =>{
    try{
        const order = await Order.findById(req.params.id).populate('menus')

        if (!order) {
            return res.status(404).json({ success: false, message: "Commande non trouvée" })
        }

        res.status(200).json({ success: true, message: "Commande récupérée avec succès", order })
    }
    catch(err){
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: err.message })
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({ success: false, message: "Erreur serveur" })
    }

}

module.exports = getOne
