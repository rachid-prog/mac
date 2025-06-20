const mongoose = require('mongoose');

// Schéma de données pour les produits
const ProductSchema = new mongoose.Schema({
  name: {type: String, 
    required : [true, 'Nom requis'], 
    unique: [true, "Nom du produit unique"],
    trim: true, 
    lowercase : true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères.'],
    match: [/^[A-Za-zÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, des espaces, des apostrophes et des tirets.'],
   
    
},
 price: {
    type: Number,
    required: [true, 'Le prix est requis.'],
    min: [0, 'Le prix doit être supérieur ou égal à 0.'],
    max: [100000, 'Le prix ne peut pas dépasser 100 000.']
  },
  description: {
    type: String,
    required: [true, 'La description est requise.'],
    minlength: [10, 'La description doit contenir au moins 10 caractères.'],
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères.']
  },
  image: {
    type: String,    
    
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis.'],
    min: [0, 'Le stock doit être supérieur ou égal à 0.']
  },
},{ timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);