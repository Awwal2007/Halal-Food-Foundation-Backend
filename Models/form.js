const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    businessName: { type: String },
    serviceInterestedIn: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })

const formModel = mongoose.model('form', formSchema);
module.exports = formModel;