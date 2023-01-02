const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');
const Destination = require('../models/destination');


exports.createDest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image harus diupload');
        err.errorStatus = 422;
        throw err;  
    }
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;

    // Post data ke mongoDB dengan response API
    const Posting = new Destination({
        title: title,
        description: description,
        image: image,
        author: {uuid: 1, name: 'Testing'}
    })
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: "Create destination post success",
            data: result
        })
    })
    .catch(err => {
        console.log('Err: ', err)
    });
};
exports.getAllDest = (req, res, next) => {
    // memberikan default value 1 (in case unfilled from user)
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    Destination.find().countDocuments()
    .then(count=>{
        // For pagination and item per page
        totalItems = count;
        return Destination.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then(result => [
        res.status(200).json({
            message: 'Get All Data Destination, Success ✅',
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage
        })
    ])
    .catch(err => {
        next(err);
    })
};
exports.getDestById = (req, res, next) => {
    const postId = req.params.postId
    Destination.findById(postId)
    .then(result=> {
        if(!result){
            const error = new Error('Destination tidak ditemukan!');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Get Data Destination, Success ✅',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
};
exports.updateDest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image harus diupload');
        err.errorStatus = 422;
        throw err;  
    }
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const postId = req.params.postId

    Destination.findById(postId)
    .then(dest => {
        if(!dest){
            const err = new Error('Destination tidak ditemukan!')
            err.errorStatus = 404;
            throw err;
        }
        dest.title = title;
        dest.description = description;
        dest.image = image;

        return dest.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update Success',
            data: result,
        })
    })
    .catch(err => {
        next(err)
    });
};
exports.deleteDest = (req, res, next) => {
    const postId = req.params.postId;

    Destination.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Destinasi tidak ditemukan!');
            error.errorStatus = 404;
            throw error;
        }
        // fungsi dibawa 👇🏼
        removeImage(post.image);
        return Destination.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({
            message:'Delete berhasil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
};

const removeImage = (filePath) => {
    console.log('filePath', filePath);
    // Untuk menemukan path direktori image
    filePath = path.join(__dirname,'../..', filePath)
    // Remove image
    fs.unlink(filePath, err => console.log(err));
}