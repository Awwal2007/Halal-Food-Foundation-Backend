const express = require('express');
const newsRouter = express.Router();

const {
    createNews,
    getAllNews,
    getNewsById,
    deleteNewsById
} = require('../Controllers/newsController');

const uploadNewsImages = require("../Config/multer");
const isLoggedIn = require('../Middlewares/isLoggedIn');

newsRouter.get("/", getAllNews);
newsRouter.get("/:id", getNewsById);
newsRouter.delete("/:id", isLoggedIn, deleteNewsById);

newsRouter.post(
    "/",
    isLoggedIn,
    uploadNewsImages.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
    ]),
    createNews
);

module.exports = newsRouter;
