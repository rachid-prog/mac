const Product = require('../../models/product')


const getOne = async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            res.status(400).json({success: false, message:"Pas de produit trouver"})
        }
        res.status(200).json({ success: true, message:'Un produit trouver', produit : product})

    }
    catch(err){
        console.log(err)
        if(err.name="CastError"){
            return res.status(400).json({success: false, massage :"Erreur du identifiant du produit"})
        }
        res.status(500).json({ succes: false, message: "Erreur serveur"})
    }

}

module.exports = getOne