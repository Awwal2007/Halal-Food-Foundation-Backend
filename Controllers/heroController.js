const heroModel = require('../Models/hero')

const createHeroImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Main image is required",
      });
    }

    const hero = await heroModel.create({
      ...req.body,
      mainImage: req.file.path.replace(/\\/g, "/"),
      createdBy: req.user?.id || null,
    });

    res.status(201).json({
      status: "success",
      message: "Hero Image created successfully!",
      hero
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const getAllHeroImage = async (req, res, next)=>{
    const { category } = req.query;
    console.log(category);
    
    try {
         // Build query object
        const filter = {};
        if (category) {
            filter.category = category;
        }

        const hero = await heroModel.find(filter).sort({ createdAt: -1 });
        
        if(!hero){
            return res.status(404).json({
                status: "error",
                message: "hero image not found"
            })
        }

        if(hero.length === 0){
            return res.status(200).json({
                status: "success",
                message: "There is no hero image in the database",
                hero: []
            })
        }

        res.status(200).json({
            status: 'success',
            message: "hero image fetched!",
            hero
        })
    } catch (error) {
        console.log(error);
        next(error)       
    }
}

const getHeroImageById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const hero = await heroModel.findById(id)
        if(!hero){
            return res.status(404).json({
                status: "error",
                message: `hero image with this id: ${id} not found`
            })
        }

        res.status(200).json({
            status: 'success',
            message: "hero image fetched!",
            hero
        })
    } catch (error) {
        console.log(error);
        next(error)     
    }
}

const deleteHeroImageById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const hero = await heroModel.findByIdAndDelete(id)
        if(!hero){
            return res.status(404).json({
                status: "error",
                message: `hero image with id: ${id} not found`
            })
        }
        res.status(202).json({
            status: "error",
            message: "Hero Image deleted successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

const updateHeroImage = async (req, res, next)=>{
    const {id} = req.params.id
    const { title, } = req.body;
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({
                status: "error",
                message: "Image upload failed or missing",
            });
        }
        const updatedData = { title, image: req.file.path };
        const updatedEvent = await heroModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({
            status: "success",
            message: "hero image update successfully",
            updatedEvent
        });
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

module.exports = {
    createHeroImage,
    getAllHeroImage,
    getHeroImageById,
    deleteHeroImageById,
    updateHeroImage
}