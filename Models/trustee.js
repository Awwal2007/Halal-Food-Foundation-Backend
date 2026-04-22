const mongoose = require('mongoose')
const trusteeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    position: { type: String },
    order: { type: Number, default: 0 }
}, { timestamps: true })

const trusteeModel = mongoose.model('trustee', trusteeSchema);
module.exports = trusteeModel
