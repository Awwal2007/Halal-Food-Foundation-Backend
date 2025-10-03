const facebookModel = require('../Models/facebook');

// Create a new Facebook post link
const createFacebookUrl = async (req, res, next) => {
    const {facebookLink} = req.body
  try {
    const facebook = await facebookModel.create({
      facebookLink
    });

    res.status(201).json({
      status: "success",
      message: "Facebook URL created successfully!",
      facebook
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get all Facebook post links
const getAllFacebookUrl = async (req, res, next) => {
  const { category } = req.query;

  try {
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const facebook = await facebookModel.find(filter).sort({ createdAt: -1 });

    if (!facebook || facebook.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "There are no URL links in the database",
        facebook: []
      });
    }

    res.status(200).json({
      status: "success",
      message: "Facebook URLs fetched successfully",
      facebook
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Delete a Facebook post link by ID
const deleteFacebookUrlById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const facebookLink = await facebookModel.findByIdAndDelete(id);

    if (!facebookLink) {
      return res.status(404).json({
        status: "error",
        message: `URL link with id: ${id} not found`
      });
    }

    res.status(202).json({
      status: "success",
      message: "URL link deleted successfully"
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createFacebookUrl,
  getAllFacebookUrl,
  deleteFacebookUrlById
};
