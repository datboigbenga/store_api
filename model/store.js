const mongoose = require("mongoose")

const Storeschema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "product name must be provided"],
        trim: true,
        maxlength: [20, "maximum length must not be more than 20 characters "]
    }, 
    price:{
        type: Number,
        required: [true, "price is required"]
    },
    featured:{
        type: Boolean,
        default:false
    },
    rating:{
        type: Number,
        default: 4.5
    },
    company:{
        type:String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            // ["jumia", "konga", "jiji", "efritin"],
            message: "{VALUE} is not supported"
        }
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", Storeschema)