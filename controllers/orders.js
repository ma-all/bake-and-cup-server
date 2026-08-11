const Order = require('../models/order')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const create = async (req, res) => {
    try {
        const order = await Order.create(req.body)
        res.status(201).json(order)

    } catch (error) {
        res.status(500).json({ error: error.mesage })


    }
}

const index = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items')
        console.log(orders);

        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({ error: error.mesage })

    }
}

const show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('items')
        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error: error.mesage })

    }

}

const update = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true })
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const deleteOrder = async (req, res) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.orderId)

        res.status(200).json(deleteOrder)
    } catch (error) {
        res.status(500).json({ error: error.mesage })

    }
}

const createPayment = async (req, res) => {
    const { payAmount } = req.body

    const createPayment = await stripe.paymentIntents.create({
        amount: Math.round(payAmount * 100), 
        currency: 'usd', //trying to see if it works with usd or not
        payment_method_types: ['card'],
    })
    res.send({ clientSecret: createPayment.client_secret })
}


module.exports = {
    create,
    index,
    show,
    deleteOrder,
    update,
    createPayment,
}