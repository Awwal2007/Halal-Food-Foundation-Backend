const express = require('express');
const trusteeRouter = express.Router();

const {
    createTrustee,
    getAllTrustees,
    getTrusteeById,
    deleteTrusteeById,
    updateTrustee
} = require('../Controllers/trusteeController');

const uploadImages = require("../Config/multer");
const isLoggedIn = require('../Middlewares/isLoggedIn');

trusteeRouter.get("/", getAllTrustees);
trusteeRouter.get("/:id", getTrusteeById);
trusteeRouter.delete("/:id", isLoggedIn, deleteTrusteeById);
trusteeRouter.post("/", isLoggedIn, uploadImages.single('image'), createTrustee);
trusteeRouter.put("/:id", isLoggedIn, uploadImages.single('image'), updateTrustee);

module.exports = trusteeRouter;
