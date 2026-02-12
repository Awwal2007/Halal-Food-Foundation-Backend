const newsModel = require('../Models/news')

const createNews = async (req, res, next) => {
  try {
    // if (!req.files || !req.files.mainImage) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Main image is required",
    //   });
    // }

    const news = await newsModel.create({
      ...req.body,
      mainImage: req.files.mainImage[0].path.replace(/\\/g, '/'),
      image1: req.files.image1?.[0]?.path.replace(/\\/g, '/'),
      image2: req.files.image2?.[0]?.path.replace(/\\/g, '/'),
      image3: req.files.image3?.[0]?.path.replace(/\\/g, '/'),
      createdBy: req.user?.id || null,
    });

    res.status(201).json({
      status: "success",
      message: "News created successfully!",
      news
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const getAllNews = async (req, res, next)=>{
    const { category } = req.query;
    console.log(category);
    
    try {
         // Build query object
        const filter = {};
        if (category) {
            filter.category = category;
        }

        const news = await newsModel.find(filter).sort({ createdAt: -1 });
        
        // res.json(foods)
        if(!news){
            return res.status(404).json({
                status: "error",
                message: "news not found"
            })
        }

        if(news.length === 0){
            return res.status(200).json({
                status: "success",
                message: "There is no news in the database",
                news: []
            })
        }

        res.status(200).json({
            status: 'success',
            message: "news fetched!",
            news
        })
    } catch (error) {
        console.log(error);
        next(error)       
    }
}

const getNewsById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const news = await newsModel.findById(id)
        if(!news){
            return res.status(404).json({
                status: "error",
                message: `news with this id: ${id} not found`
            })
        }

        res.status(200).json({
            status: 'success',
            message: "news fetched!",
            news
        })
    } catch (error) {
        console.log(error);
        next(error)     
    }
}

const deleteNewsById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const news = await newsModel.findByIdAndDelete(id)
        if(!news){
            return res.status(404).json({
                status: "error",
                message: `news with id: ${id} not found`
            })
        }
        res.status(202).json({
            status: "success",
            message: "News deleted successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

const updateNews = async (req, res, next)=>{
    const {id} = req.params.id
    const { title, date, description, link } = req.body;
    try {
        // if (!req.file || !req.file.path) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Image upload failed or missing",
        //     });
        // }
        const updatedData = { title, link, date, description, image: req.file.path };
        const updatedEvent = await newsModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({
            status: "success",
            message: "news update successfully",
            updatedEvent
        });
    } catch (error) {
        console.log(error);
        next(error)      
    }
}

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    deleteNewsById,
    updateNews
}