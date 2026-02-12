const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title:{type: String, required: true},
    link:{type: String},
    date:{type: Date, required: true},
    mainImage:{type: String, required: true},
    description:{type: String, required: true},
    image1:{type: String, },
    image2:{type: String, },
    image3:{type: String, },
}, {timestamps: true})

const newsModel = mongoose.model('news', newsSchema);
module.exports = newsModel