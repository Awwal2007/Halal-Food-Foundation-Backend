const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const errorHandler = require('./Middlewares/errorHandler');
const newsRouter = require('./Routes/newsRouter');
const authRouter = require('./Routes/authRouter');
const facebookRouter = require('./Routes/facebookRouter');
const heroRouter = require('./Routes/heroRouter');
dotenv.config()

require("./Config/connectToDb");
// require("./Services/Nodemailer/transporter");

// const newsRouter = require('./Routes/newsRouter');


const clientDomain = process.env.client_domain

app.use(cors({
    origin: `${clientDomain}`
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.listen(400, ()=>{
    console.log('listen to port 400');    
})
//Routes
app.get("/", (req, res)=>{res.send("Welcome to Halal Food Foundation Api version 1.0")})


app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/facebook", facebookRouter);
app.use("/api/hero", heroRouter);

app.use(express.json())

app.all("/{*any}", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server.`)
})
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   next();
// });

app.use(errorHandler);