const User = require('../../models/Users')
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    try{
        const {name} = req.body;
        const {password} = req.body;    

        const user = await User.findOne({ name });
        if(user){
            return res.status(400).json({success: false, message: "Ce nom d'utilisateur est déjà pris"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            password: hashedPassword
        });

        if(!newUser){
            return res.status(400).json({success: false, message: "Erreur lors de la création de l'utilisateur"});
        }
        res.status(201).json({success: true, message: "Utilisateur créé avec succès", newUser});


    }
    catch(err){
        console.log(err)
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }
        res.status(500).json({success: false, message: "Erreur serveur"})
    }

}

module.exports = register;