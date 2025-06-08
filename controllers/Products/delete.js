const Product = require('../../models/product')

const deleteProduct = async(req, res)=>{
    try{
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(400).json({success: false, message:"Aucun produit trouver"})
        }
        res.status(200).json({ success: true, message:"produit supprimer avec succées"})

    }
    catch(err){
        console.log(err)
        if(err.name="CastError"){
            return res.status(400).json({success: false, massage :"Erreur du identifiant du produit"})
        }
        res.staus(500).json({success: false, message: "erreur de serveur"})
    }

}

module.exports = deleteProduct