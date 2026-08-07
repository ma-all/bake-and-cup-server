const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Coffee', 'Non-Coffee', 'Pastry'],
    },
    caffeine: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
        min: 0.1,
    },
    img: {
        type: String,
    }
}, {timestamps: true})

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

module.exports = MenuItem