const express = require('express');
const facebookRouter = express.Router();

const {createFacebookUrl, deleteFacebookUrlById, getAllFacebookUrl} = require('../Controllers/facebookController')

facebookRouter.post('/', createFacebookUrl);
facebookRouter.delete('/:id', deleteFacebookUrlById);
facebookRouter.get('/', getAllFacebookUrl);

module.exports = facebookRouter


