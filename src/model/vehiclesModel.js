const mongoose = require("mongoose");
const vehiclesSchema = new mongoose.Schema(
  {
    licensePlateNumber:{type:String,required:true},
    manufacturerName:{type:String,required:true},
    model:{type:String,required:true},
    fuelType:{type:String,required:true,enum:["petrol", "desiel","electric"]},
    ownerName:{type:String,required:true},
    rc_status:{type:String,required:true,enum:["Active","Inactive"]},
    vehicleColor:{type:String,required:true},
    registrationDate:{type:Date,required:true},
    insuranceUpto:{type:Date,required:true},
    fitnessUpto:{type:Date,required:true},
    roadTaxUpto:{type:Date,required:true},
    deletedAt: { type: String },
    isDeleted: { type: Boolean, default: false }

  },
  { timestamps: true } 
);

module.exports = mongoose.model("Vehicle", vehiclesSchema);







