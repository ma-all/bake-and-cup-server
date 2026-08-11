const express = require('express')
const MenuItem = require('../models/menuItem')

const create = async (req, res) => {
    try {
        req.body.reviewer = req.user._id
        const review = await MenuItem.create(req.params.menuItemId)
        review.reviews.push(req.body)
        await review.save()
        const newReview = review.reviews[review.reviews.length - 1]
        newReview._doc.reviwer = req.user
        res.status(201).json(newReview)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const update = async (req, res) => {
    try {
        const review = await MenuItem.findById(req.params.menuItemId)
        const reviewCmt = review.reviews.id(req.params.reviewId)
        if (reviewCmt.reviwer.toString() !== req.user._id) {
            return res
            .status(403)
            .json({ message: 'You cannot edit this review.'})
        }
        reviewCmt.comment = req.body.comment
        await review.save()
        res.status(200).json({ message: 'Review updated successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await MenuItem.findById(req.params.menuItemId)
        const reviewCmt = review.reviews.id(req.params.reviewId)
        if (reviewCmt.reviwer.toString() !== req.user._id) {
            return res
            .status(403)
            .json({ message: 'You cannot edit this review.'})
        }
        review.reviews.remove({ _id: req.params.reviewId})
        await review.save()
        res.status(200).json({ message: 'Review deleted successfully'})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    create, update, deleteReview,
}