const Menu = require('../../models/Menu')

const update = async (req, res)=>{
    try{
        const {id} = req.params
        const {name} = req.body
        const menu = await Menu.findByIdAndUpdate(id,{name}, {new: true})
        if(!menu){
                res.status(400).json({success: false, message: "Pas de menu touver"})
        }
        res.status(201).json({success: true, message:"Menu modifier avec succées", menu})

    }
    catch(err){
         console.log(err)
         if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

         if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }
        res.status(500).json({success: false, message:"Erreur serveur" })
    }

}

module.exports = update