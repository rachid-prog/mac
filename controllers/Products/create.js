const Product = require('../../models/product')


const creatProduct = async (req, res)=>{
    try{
        console.log(req.body)
        const {name, price, description, stock, image} = req.body
         
        const existe = await Product.findOne({name})
        if(existe){
            return res.status(400).json({success: false, massage:"Nom produit existe"})
        }
        
        const product = await Product.create({name, price, description, stock, image})
        if(!product){
            return res.status(400).json({success: false, massage:"Erreur de création du produit"})
        }

        res.status(200).json({success: true, massage:"produit créer avec succées", product})
        

    }
    catch(err){
        console.log(err)
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

         if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }
       
        res.status(500).json({success: false, message: "Erreur serveur"})
    }
    
}

module.exports = creatProduct