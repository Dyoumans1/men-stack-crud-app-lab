const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    diameter: { type: Number, required: true },
    distanceFromSun: { type: Number, required: true },
    numberOfMoons: { type: Number, default: 0 },
    hasRings: { type: Boolean, default: false },
    surfaceTemperature: { type: Number },
    imageUrl: {type: String },
});

module.exports = mongoose.model('Planet', planetSchema );