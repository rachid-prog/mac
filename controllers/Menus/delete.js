const Menu = require('../../models/Menu')

const deletemenu = async(req, res)=>{
    try{
        const {id} = req.params
        
        const menu = await Menu.findByIdAndDelete(id)
        if(!menu){
                res.status(400).json({success: false, message:"Aucun menu trouver"})
        }
        res.status(200).json({ success: true, message:"Menu supprimer avec succées"})

    }
    catch(err){
        console.log(err)
        if(err.name="CastError"){
            return res.status(400).json({success: false, massage :"Erreur du identifiant du Menu"})
        }
        res.staus(500).json({success: false, message: "erreur de serveur"})

    }
}

module.exports = deletemenu