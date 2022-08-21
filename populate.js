// require("dotenv").config()
// const connectDB = require("./db/database")
// const store = require('./model/store')
// const jsonProduct = require("./products.json")

// const start = async()=>{
//     try {
//         await connectDB(process.env.MongoURI)
//         await store.deleteMany();
//         await store.create(jsonProduct)
//         console.log("success")
//     } catch (error) {
//         console.log(error)
//     }
// }

// start()

function maskify(cc) {
    // return cc.replace(/.(?=.....)/g, '#');
    return cc.replace(/.(?=.....)/g, '#');
  }

  console.log(maskify("12272272727277"))