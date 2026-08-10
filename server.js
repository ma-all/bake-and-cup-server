const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const uploadImages = require('./config/multer')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')

//menuItems ctrl
const menuCtrl = require('./controllers/menuItems')

// order ctrl
const orderCtrl = require('./controllers/orders')

const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes go here
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)

app.get('/users', verifyToken, usersCtrl.index)

//menuItems routes
app.post('/menu-items', uploadImages.single('img'), menuCtrl.create)
app.get('/menu-items', menuCtrl.index)
app.get('/menu-items/:menuItemId', menuCtrl.show)
app.put('/menu-items/:menuItemId', menuCtrl.update)
app.delete('/menu-items/:menuItemId', menuCtrl.deleteMenuItem)


// order routes
app.post('/orders',orderCtrl.create)
app.get('/orders', orderCtrl.index)
app.get('/orders/:orderId', orderCtrl.show)
app.put('/orders/:orderId', orderCtrl.update)
app.delete('/orders/:orderId', orderCtrl.deleteOrder)

//payment 
app.post('/orders/create-payment', orderCtrl.createPayment)


app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})
