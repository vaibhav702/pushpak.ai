const mongoose = require("mongoose");
// const vehiclesModel = require("./vehiclesModel");
// const ObjectId = mongoose.Schema.Types.ObjectId
const ViolationSchema = new mongoose.Schema(
  {
    licensePlateNumber:{type:String,required:true},
    violationType:{type:String,required:true},
    status:{type:String,enum:["paid","unpaid"]},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    location:{type:String,required:true},
    videoUrl:{type:String,required:true}


  },
  { timestamps: true }
);

module.exports = mongoose.model("Violation", ViolationSchema);
