// user
// user.role === "seller"
const isSeller = (req, res, next)=>{
    if(req?.user.role !== "seller"){
        return res.status(403).json({
            status: "error",
            message: "You must be a seller to perform this action."
        })
    }
    next()
}

module.exports = isSeller