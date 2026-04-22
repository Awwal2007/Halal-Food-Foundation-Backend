const trusteeModel = require('../Models/trustee')

const createTrustee = async (req, res, next) => {
    try {
        const { name, bio, position, order } = req.body;
        let image = '';
        
        if (req.file) {
            image = req.file.path;
        }

        const trustee = await trusteeModel.create({
            name,
            bio,
            position,
            order,
            image
        });

        res.status(201).json({
            status: "success",
            message: "Trustee created successfully!",
            trustee
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllTrustees = async (req, res, next) => {
    try {
        const trustees = await trusteeModel.find().sort({ order: 1, createdAt: -1 });
        
        res.status(200).json({
            status: 'success',
            message: "Trustees fetched!",
            trustees
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getTrusteeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const trustee = await trusteeModel.findById(id);
        if (!trustee) {
            return res.status(404).json({
                status: "error",
                message: `Trustee with this id: ${id} not found`
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Trustee fetched!",
            trustee
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteTrusteeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const trustee = await trusteeModel.findByIdAndDelete(id);
        if (!trustee) {
            return res.status(404).json({
                status: "error",
                message: `Trustee with id: ${id} not found`
            });
        }
        res.status(202).json({
            status: "success",
            message: "Trustee deleted successfully"
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updateTrustee = async (req, res, next) => {
    const { id } = req.params;
    const { name, bio, position, order } = req.body;
    try {
        const updateData = { name, bio, position, order };
        
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedTrustee = await trusteeModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedTrustee) {
            return res.status(404).json({
                status: "error",
                message: `Trustee with id: ${id} not found`
            });
        }

        res.status(200).json({
            status: "success",
            message: "Trustee updated successfully",
            trustee: updatedTrustee
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    createTrustee,
    getAllTrustees,
    getTrusteeById,
    deleteTrusteeById,
    updateTrustee
}
