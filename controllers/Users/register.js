/**
 *  register
 * =============================================================
 =  Crée un nouvel utilisateur après validation des données.   =
 =  Vérifie l'unicité du nom d'utilisateur                     =
 =  Hash le mot de passe avant de le stocker                   =
 =  Gère les erreurs de validation, duplication et serveur     =
 ===============================================================
 */

const User = require('../../models/Users')
const bcrypt = require('bcrypt');



const register = async (req, res) => {
    try{
        
        const {name, password} = req.body;
        
        // Vérification des champs requis
        if (!name || !password) {
            return res.status(400).json({ success: false, message: "Le nom et le mot de passe sont requis" });
        }
          

        const user = await User.findOne({ name });

        if(user){
            return res.status(400).json({success: false, message: "Ce nom d'utilisateur est déjà pris"});
        }
        
        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
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

         // Erreur de validation Mongoose
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message})
        }
        
        // Erreur d'unicité (doublon MongoDB)
        if(err.code === 11000){
            return res.status(400).json({success: false, message: "Ce nom d'utilisateur est déjà pris"})
        }
        
        res.status(500).json({success: false, message: "Erreur serveur"})
    }

}

module.exports = register;