const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  
    item: {
            type: Array,
            required: true
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