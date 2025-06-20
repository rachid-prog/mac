const Order = require('../../models/Order')
const Menu = require('../../models/Menu')



const create = async(req, res)=>{
    try{
        //vérifier le role de l'utilisateur
        if(req.user.role !== "admin" && req.user.role !== "accueil"){
            return res.status(403).json({success: false, message: "Accès interdit"})
        }
        //calculer le prix total de la commande
        if(!req.body.menus || req.body.menus.length === 0){
            return res.status(400).json({success: false, message: "Veuillez fournir des menus pour la commande"})
        }
        const menus = req.body.menus
        let totalPrice = 0;
        for (const menuId of menus) {
            const menu = await Menu.findById(menuId);
            if (!menu) {
                return res.status(400).json({success: false, message: `Menu avec l'ID ${menuId} non trouvé`});
            }
            
            totalPrice += menu.totalPrice; 
        }
        
        req.body.totalPrice = totalPrice;
               
      
        const order = await Order.create({...req.body, user: req.user._id});        
        
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