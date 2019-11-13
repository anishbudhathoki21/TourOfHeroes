const mongoose = require('mongoose');

//VILLIANS MODEL
const villainsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    desc : {
        type : String,
        default: "Description not available now."
    },
    fights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero'
    }]
}, {timestamps:true});

module.exports = mongoose.model('Villain', villainsSchema);