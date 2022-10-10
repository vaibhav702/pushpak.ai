const vehicleModel = require("../model/vehiclesModel");
let moment = require("moment");
const registerVehicles = async (req, res) => {
  try {
    const registerVehicle = req.body;
    const {
      licensePlateNumber,
      manufacturerName,
      model,
      fuelType,
      ownerName,
      rc_status,
      vehicleColor,
      registrationDate,
      insuranceUpto,
      fitnessUpto,
      roadTaxUpto,
    } = registerVehicle;
    if (!licensePlateNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter license plate number" });
    }
    
    if (!manufacturerName) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter manufacturerName " });
    }
    if (!model) {
      return res.status(400).send({ status: false, msg: "please enter model" });
    }
    if (!fuelType) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter fuelType" });
    }
    if (!rc_status) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter  rc_status" });
    }
    if (!vehicleColor) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter vehicleColor" });
    }
    if (!registrationDate) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter registerationDate" });
    }

    if (!insuranceUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter insuranceUpto" });
    }
    if (!ownerName) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter ownerName" });
    }
    if (!fitnessUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enterfitnessUpto" });
    }

    if (!roadTaxUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter roadTaxUpto" });
    }

    let m = moment(
      registrationDate,
      roadTaxUpto,
      fitnessUpto,
      insuranceUpto,
      "YYYY-MM-DD"
    );

    if (!m) {
      return res.status(400).json({
        status: false,
        message: "Date Should be in these format YYYY-MM-DD",
      });
    }
    const alreadylicensePlateNumber=vehicleModel.findOne({licensePlateNumber:licensePlateNumber,isDeleted:false})
    if(!alreadylicensePlateNumber){
        return res
        .status(400)
        .send({ status: false, msg: "this number plate is already register " });
    }
    let SavedVehicle = await vehicleModel.create(registerVehicle);
    return res.status(201).send({ status: true, msg: SavedVehicle });
  } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message });
  }
};
module.exports.registerVehicles = registerVehicles;

const getRegisterVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params._id;
    const VehicleData = await vehicleModel.findOne({
      _id: vehicleId,
      isDeleted: false,
    });

    return res
      .status(200)
      .send({ status: true, message: "vehicle list", data: VehicleData });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.getRegisterVehicleById = getRegisterVehicleById;

const getAllVehicle = async (req, res) => {
  try {
    let vehicle = await vehicleModel.find({ isDeleted: false });
    console.log(vehicle);
    if (vehicle.length > 0) {
      return res.status(200).send({
        status: true,
        message: " got all vehicle register",
        data: vehicle,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "not a valid request" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};
module.exports.getAllVehicle = getAllVehicle;

const updateVehicle = async function (req, res) {
  try {
    const vehicleId = req.params._id;
    let vehiclePresent = await vehicleModel.findOne({
      _id: vehicleId,
      isDeleted: false,
    });
    if (!vehiclePresent) {
      return res
        .status(404)
        .send({ status: false, message: "Vehicle with this id not found" });
    }
    let requestBody = req.body;
    const {
      licensePlateNumber,
      manufacturerName,
      model,
      fuelType,
      ownerName,
      rc_status,
      vehicleColor,
      registrationDate,
      insuranceUpto,
      fitnessUpto,
      roadTaxUpto,
    } = requestBody;
    if (!licensePlateNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter license plate number" });
    }
    if (!manufacturerName) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter manufacturerName " });
    }
    if (!model) {
      return res.status(400).send({ status: false, msg: "please enter model" });
    }
    if (!fuelType) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter fuelType" });
    }
    if (!rc_status) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter  rc_status" });
    }
    if (!vehicleColor) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter vehicleColor" });
    }
    if (!registrationDate) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter registerationDate" });
    }

    if (!insuranceUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter insuranceUpto" });
    }
    if (!ownerName) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter ownerName" });
    }
    if (!fitnessUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enterfitnessUpto" });
    }
    if (!roadTaxUpto) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter roadTaxUpto" });
    }
    const update = requestBody;

    const updatedData = await vehicleModel.findOneAndUpdate(
      { _id: vehicleId },
      update,
      { new: true }
    );
    if (updatedData) {
      return res.status(200).send({
        status: true,
        msg: "Vehicle is updated",
        data: updatedData,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message });
  }
};
module.exports.updateVehicle = updateVehicle;
const deleteVehicleById = async function (req, res) {
  try {
    const VehicleId = req.params._id;

    let deletedVehicle = await vehicleModel.findOneAndUpdate(
      { _id: VehicleId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!deletedVehicle) {
      return res
        .status(404)
        .send({ status: false, message: "Vehicle not found" });
    }
    if (deletedVehicle) {
      return res
        .status(200)
        .send({ status: true, msg: "Vehicle is successfully deleted" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.deleteVehicleById = deleteVehicleById;
