const Product = require('../../models/product')

const update = async(req, res)=>{
    try{
        const {id} = req.params
        const {name, price} = req.body
        const product = await Product.findByIdAndUpdate(id,{name, price}, {new: true})
        if(!product){
            res.status(400).json({success: false, message: "Pas de produit touver"})
        }
        res.status(201).json({success: true, message:"Produit modifier avec succées", produit: product})


    }
    catch(err){
        console.log(err)
         if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

         if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }
         if(err.name ==="MongooseError"){
            return res.status(400).json({ success: false, message: "Le nom doit être unique" });
        }
        res.status(500).json({success: false, message:"Erreur serveur" })
    }

}

module.exports = update