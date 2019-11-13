const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    comment : {
        type:String,
        require :true
    }
}, {timestamps:true});
const heroSchema = new mongoose.Schema({ 
    name:{
            type:String,
            require:true
        },
    desc : {
            type:String,
            require:true
    },
    comments : [commentsSchema],
    fights : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Villain'
    }]
}, {timestamps:true});



module.exports = mongoose.model('Hero',heroSchema);
