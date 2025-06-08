const Order = require('../../models/Order')

const create = async(req, res)=>{
    try{
        const order = await Order.create(req.body)
        
        if(!order){
            return res.status(400).json({success: false, message:"pas de menu trouver"})
        }
       res.status(200).json({success: true, message: "Order créer avec succées", order})

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

module.exports = create