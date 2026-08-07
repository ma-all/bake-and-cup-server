const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required: true,
    },

    item: {
            type: String,
            enum: ['Coffee', 'Non-Coffee', 'Pastry'],
        },

    totalCaffeine:{
        type: Number,
        required:true,

    },

    totalPrice:{
        type:Number,
        required:true,
    },

},{timestamps:true})

const Order = mongoose.model('Order', orderItemSchema)
module.exports = Order