const MenuItem = require('../models/menuItem')

const create = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body)
        res.status(201).json(menuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const index = async (req, res) => {
    try {
        const menuItem = await MenuItem.find({})
        res.status(200).json(menuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const show = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.menuItemId)
        res.status(200).json(menuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index, show,
}