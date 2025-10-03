const express = require('express');
const heroRouter = express.Router();

const {
    createHeroImage,
    getAllHeroImage,
    getHeroImageById,
    deleteHeroImageById,
    updateHeroImage
} = require('../Controllers/heroController');

const uploadNewsImages = require("../Config/multer");
const isLoggedIn = require('../Middlewares/isLoggedIn');

heroRouter.get("/", getAllHeroImage);
heroRouter.get("/:id", getHeroImageById);
heroRouter.delete("/:id", isLoggedIn, deleteHeroImageById);

heroRouter.post(
    "/",
    isLoggedIn,
    uploadNewsImages.single("mainImage"),
    createHeroImage
);

module.exports = heroRouter;
