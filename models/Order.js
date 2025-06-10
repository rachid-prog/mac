const mongoose = require('mongoose');
const Counter = require('./Counter')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],  
  createdAt: { type: Date, default: Date.now },
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