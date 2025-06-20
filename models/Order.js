const mongoose = require('mongoose');
const Counter = require('./Counter')


// Schéma de la commande
const orderSchema = new mongoose.Schema({

  // Référence à l'utilisateur qui a passé la commande
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 
  // Liste des menus commandés (liée au modèle Menu)
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }], 

  createdAt: { type: Date, default: Date.now },
 
  // Numéro de commande unique généré automatiquement
  orderNumber: { type: String, unique: true }, 

  status: {
    type: String,
    enum: ['en attente', 'préparé'],
    default: 'en attente'
  },
  totalPrice: { type: Number, default: 0 },
  
});


orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'orderNumber' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.orderNumber = counter.seq;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema)