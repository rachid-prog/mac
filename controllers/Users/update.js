const User = require('../../models/Users');
const bcrypt = require('bcrypt');

const update = async (req, res) => {
    console.log(req.user);
    try{
        const userId = req.params.id;
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        }
       
       
        //Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
      
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, password : hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        return res.status(200).json({ success: true, data: updatedUser });

    }
    catch(err){
        console.error(err);
         if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }

        if (err.name === "CastError") {
            return res.status(400).json({ message: err.message })
        }
        if(err.name ==="MongooseError"){
            return res.status(400).json({ success: false, message: "Le nom doit être unique" });
        }

        return res.status(500).json({ success: false, message: "Erreur serveur" });
    }

}

module.exports = update;