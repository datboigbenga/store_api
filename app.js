require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const connectdb = require("./db/database")
const products = require("./routes/store")
const notfound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// const router = express.Router()

app.get("/", async(req,res)=>{
    res.status(201).send("<h1>Welcome to the Homepage</h1>")
})

app.use("/api/v1/products", products)

app.use(notfound)
app.use(errorHandler)
const port = 5000

const start = async()=>{
    try {
        await connectdb(process.env.MongoURI)
        app.listen(port, ()=>{console.log(`server listenning on port ${port}....`)})
    } catch (error) {
        console.log("unable to connect to database", error)
    }

}
start()