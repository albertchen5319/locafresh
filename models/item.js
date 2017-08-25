let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    farm:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    price:{
        type: Number,
        required: true
    }


});

let Item = module.exports = mongoose.model('Item', itemSchema);