const mongoose = require('mongoose')
const facebookSchema = new mongoose.Schema({
    facebookLink:{type: String, required: true},
}, {timestamps: true})

const facebookModel = mongoose.model('facebook', facebookSchema);
module.exports = facebookModel