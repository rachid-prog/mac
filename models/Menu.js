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

module.exports = mongoose.model('Menu', menuSchema)