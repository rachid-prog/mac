const mongoose = require('mongoose')

// Schéma de données pour les utilisateurs
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Le nom est requis"],
        unique: [true, "Le nom doit être unique"],
        trim: true,
        lowercase: true,
        minlength: [2, "Le nom doit comporter au moins 2 caractères"],
        maxlength: [50, "Le nom ne doit pas dépasser 50 caractères"],
        match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, des espaces, des apostrophes et des tirets.'],
    },
   
    password: { 
        type: String,
        required: [true, "Le mot de passe est requis"],
        trim: true,
        // minlength: [6, "Le mot de passe doit comporter au moins 6 caractères"],
        // maxlength: [32, "Le mot de passe ne doit pas dépasser 100 caractères"],
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.'], 
    },

    // Rôle de l'utilisateur
    role: {
        type: String,
        enum: ['user', 'accueil', 'preparateur', 'admin'], // Liste des rôles autorisés
        default: 'user'       
    },
    

},  { timestamps: true }) // <-- active createdAt et updatedAt automatiquement

//Ignorrer _v à la'ffichage des données
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    return ret;
  }
});



module.exports = mongoose.model('User', userSchema)