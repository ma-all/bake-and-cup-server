
const Order = require ('../models/order')

const create = async (req, res)=>{
    try {
        const order = await Order.create(req.body)
        res.status(201).json(order)
        
    } catch (error) {
        res.status(500).json({error:error.mesage})

        
    }
}

const index = async (req,res)=>{
    try {
        const orders = await Order.find({})
        res.status(200).json({error: error.mesage})
        
    } catch (error) {
        res.status(500).json({error: error.mesage})
        
    }
}

const show = async(req,res)=>{
    try {
        const order=await Order.findById(req.params.orderId)
        res.status(200).json(order)
        
    } catch (error) {
        res.status(500).json({error: error.mesage})
        
    }

}

const update = async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId,req.body,{new: true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

const deleteOrder = async (req,res)=>{
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.orderId)

        res.status(200).json(deleteOrder)
    } catch (error) {
        res.status(500).json({error: error.mesage})
        
    }
}

module.exports = {
    create,
    index, 
    show, 
    deleteOrder,
    update,
}