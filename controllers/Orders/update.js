const Order = require('../../models/Order')

const update = async(req, res)=>{
    try{
        const {id} =req.params;
        const order = await Order.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate('menus')
        if(!order){
            return res.status(404).json({success: false, message:"Commande non trouvée"})
        }
        res.status(200).json({success: true, message: "Commande mise à jour avec succès", order})

    }
    catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }

        res.status(500).json({success: false, message: "Erreur serveur"})
    }

}

module.exports = update