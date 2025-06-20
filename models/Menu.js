const mongoose = require('mongoose')


// Définition du schéma pour les menus
const menuSchema = new mongoose.Schema({
  
    name: String,

    // Liste des produits (références aux documents Product)
    products : [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        }
    ],

    totalPrice: {
        type: Number,
        default: 0
    },
   
})
/**
 * Middleware pré-enregistrement :
 * - Supprime les doublons de produits
 * - Empêche l'enregistrement si des doublons sont détectés
 */

menuSchema.pre('save', function (next) {
  const uniqueProducts = [...new Set(this.products.map(p => p.toString()))];
  if (uniqueProducts.length !== this.products.length) {
    return next(new Error('Produit en double dans le menu'));
  }
  this.products = uniqueProducts; 
  next();
});

module.exports = mongoose.model('Menu', menuSchema)