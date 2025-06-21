const Menu = require('../../models/Menu')
const mongoose = require('mongoose')

/**
 * @desc Supprimer un menu
 * @route DELETE /api/menus/:id
 * @access Private/Admin
 */
const deletemenu = async(req, res)=>{
    try{
        const {id} = req.params

        // Vérification de l'ID MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
             return res.status(400).json({ success: false, message: "ID de menu invalide" });
        }
        
        const menu = await Menu.findByIdAndDelete(id)
        if(!menu){
                res.status(400).json({success: false, message:"Aucun menu trouver"})
        }
        res.status(200).json({ success: true, message:"Menu supprimer avec succées"})

    }
    catch(err){
        console.log(err)
       
        res.status(500).json({success: false, message: "erreur de serveur"})

    }
}

module.exports = deletemenu