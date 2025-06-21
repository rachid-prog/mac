//Importer les dépendances nécessaires
const Menu = require('../../models/Menu')
const Product = require('../../models/product')

/* * @desc Créer un menu
 * @route POST /api/menus
 * @access Private/Admin
 */

const create = async(req, res)=>{
    try{
        //Caluler le prix total du menu
        if(!req.body.name || !req.body.products || req.body.products.length === 0){
            return res.status(400).json({success: false, message: "Veuillez fournir un nom et des produits pour le menu"})
        }
        const products = req.body.products
        let totalPrice = 0;
        for (const productId of products) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({success: false, message: `Produit avec l'ID ${productId} non trouvé`});
            }
            if (product.stock <= 0) {
                // Si le produit est en rupture de stock, retourner une erreur
                
                return res.status(400).json({ success: false,  message: `Le produit "${product.name}" est en rupture de stock`});
            }
            // Diminuer le stock du produit
            product.stock -= 1;
            await product.save(); // Sauvegarder le produit mis à jour
            
            totalPrice += product.price; 
        }
        req.body.totalPrice = totalPrice;

        //Créer le menu
       const menu = await Menu.create(req.body)
       if(!menu){
        return res.status(400).json({success: false, message:"pas de menu trouver"})
       }
      
       res.status(200).json({success: true, message: "Menu créer avec succées", menu})

    }
    catch(err){
          console.log(err)
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

         if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }
        if(err.name){
            return res.status(400).json({success: false, message: "Produit en double dans le menu"})
        }
        res.status(500).json({success: false, message: "Erreur serveur"})
        
    }

}

module.exports = create