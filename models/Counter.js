// models/Counter.js
const mongoose = require('mongoose');

// Définition du schéma de compteur
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', counterSchema);
