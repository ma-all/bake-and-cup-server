const MenuItem = require('../models/menuItem')
const cloudinary = require('../config/cloudinary')

const addImg = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadImgs = cloudinary.uploader.upload_stream({
            folder: 'bake-and-cup-server/menu-items',
            resource_type: 'image'
        },
        (error, result) => {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }
        }
    )
    uploadImgs.end(fileBuffer)
    })
}

const create = async (req, res) => {
    try {
        if (req.file) {
            const addedImg = await addImg(req.file.buffer)
            req.body.img = addedImg.secure_url
        }
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

const update = async (req, res) => {
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.menuItemId, req.body, { new: true })
        res.status(200).json(updatedMenuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.menuItemId)
        res.status(200).json(deletedMenuItem)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, index, show, update, deleteMenuItem,
}