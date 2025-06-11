const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: String,
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

menuSchema.pre('save', function (next) {
  const uniqueProducts = [...new Set(this.products.map(p => p.toString()))];
  if (uniqueProducts.length !== this.products.length) {
    return next(new Error('Produit en double dans le menu'));
  }
  this.products = uniqueProducts; 
  next();
});

module.exports = mongoose.model('Menu', menuSchema)