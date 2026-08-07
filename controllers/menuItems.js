const MenuItem = require('../models/menuItem')

const create = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body)
        res.status(201).json(menuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create,
}