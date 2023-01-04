const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Destination = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users'
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('Destination', Destination);