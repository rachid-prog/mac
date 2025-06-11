const Product = require('../../models/product')

const getAll = async(req, res)=>{
    try{
        const products = await Product.find().populate('user') // Populate user field with name and email
        if(!products){
            res.status(400).json({message: "pas de produit trover"})
        }
        res.status(200).json({ success: true, message:"Listes des produits", products})

    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, massage: "Erreur serveur"})

    }
}

module.exports = getAll