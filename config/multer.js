const multer = require('multer')

const imgTypes = [
    'image/jpeg',
    'image/png',
]

const uploadImgs = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5*1024*1024
    },
    fileFilter:(req, file, callback) => {
        if (imgTypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(
                new Error(`Only JPEG and PNG allowed for images.`)
            )
        }
    }
})

module.exports = uploadImgs