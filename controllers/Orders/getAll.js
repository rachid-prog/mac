const Order = require('../../models/Order');
const mongoose = require('mongoose')
const getAll = async (req, res) => {
    try {
        //Accés aux commandes selon les rôles:
        const user = req.user;
        console.log(user.role, user._id)
        const role = ["admin", "accueil"]
        if(!user || !role.includes(user.role)){
            return res.status(403).json({success: false, message: "Accès refusé  : rôle non autorisé", user})
        }
        
        //Filtrer selon rôle [admin || accueil]
        const filter = {}
        if(user.role === "accueil"){
                   filter.user = new mongoose.Types.ObjectId(user._id);
        }
        

        // Recherche toutes les commandes en populant les relations utiles
        const orders = await Order.find(filter).populate({ path: 'menus',select: 'name -_id'  }).populate({ path: 'user', select: 'name  -_id' })

        
        
         // Vérifie si aucune commande n'a été trouvée
        if (!orders ||  orders.length === 0 ) {
            return res.status(404).json({ success: false, message: "Aucune commande trouvée" });
        }
       
        
        res.status(200).json({ success: true, message: "Commandes récupérées avec succès", orders });
    } catch (err) {
        console.log(err)
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: err.message });
        }
        
        if (err.name === "CastError") {
            return res.status(400).json({ message: err.message });
        }
        
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
};

module.exports = getAll