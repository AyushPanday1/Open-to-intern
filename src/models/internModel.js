const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const InternSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
   },
   
   collegeId: {
      type: ObjectId,
      required: true,
      ref:"Colege"
   },
   email: {
      type: String,
      required: true,
      unique: true
      
   },
   mobile: {
      type: Number,
      unique: true,
      required: true
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
   }, { timestamps: true }
)

module.exports = mongoose.model("Internship",InternSchema)