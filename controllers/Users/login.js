/**
 *  login
 * ============================================================
 =    Authentifie un utilisateur en :                         =
 =    vérifiant le nom d'utilisateur                          =
 =    comparant le mot de passe haché                         =
 =    générant un JWT si les identifiants sont valides        =
 ==============================================================
 */

const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const login = async (req, res) => {
    try{
        const {name, password} = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ name });
        if(!user){
            return res.status(400).json({success: false, message: "Nom d'utilisateur ou mot de passe incorrect"});
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Nom d'utilisateur ou mot de passe incorrect"});
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '36h' });

        // Répondre avec le token et les informations de l'utilisateur
        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            user: {
                id: user._id,
                name: user.name,
                createdAt: user.createdAt
            },
            token
        });

    }
    catch(err){
        console.log(err);
        if(err.name === "ValidationError"){
            return res.status(400).json({success: false, message: err.message});
        }
        res.status(500).json({success: false, message: "Erreur serveur"});
    }
}

module.exports = login;