const mongoose = require('mongoose')
const heroSchema = new mongoose.Schema({
    title:{type: String, required: true},
    // date:{type: Date, required: true},
    mainImage:{type: String, required: true},
}, {timestamps: true})

const heroModel = mongoose.model('hero', heroSchema);
module.exports = heroModel