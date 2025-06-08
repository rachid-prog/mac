const Menu = require('../../models/Menu')

const getAll = async(req, res)=>{
    try{
        const menus = await Menu.find().populate('products', 'name price stock')
        if(!menus){
            return res.status(400).json({success: false, message: "Acun menu trouver"})
        }
        res.status(200).json({success: true, message: "liste de menu", menus})

    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false, massage: "Erreur serveur"})
    }
}

module.exports = getAll