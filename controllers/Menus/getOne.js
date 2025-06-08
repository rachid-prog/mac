const Menu = require('../../models/Menu')

const getOne = async(req, res)=>{
    try{
        const {id} = req.params

        const menus = await Menu.findById(id).populate('products')
        if(!menus){
            res.status(400).json({success: false, message: "Accun menu trouver"})
        }
        res.status(200).json({success: true, message: "Menu trouver", menus})

    }
    catch(err){
         console.log(err)
        if(err.name="CastError"){
            return res.status(400).json({success: false, massage :"Erreur du identifiant menu"})
        }
        res.status(500).json({ succes: false, message: "Erreur serveur"})
    }
}

module.exports = getOne