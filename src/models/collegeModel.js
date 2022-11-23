const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {                                     
        type: String,
        unique: true,
        required: 'College name is Neccasary'
    },
    fullName: {                              
        type: String,
        require: 'Fullname is Neccasary',
        trim : true
    },
    logoLink: {
        type: String,
        required: 'Logolink is Neccasary'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Colege', collegeSchema)
