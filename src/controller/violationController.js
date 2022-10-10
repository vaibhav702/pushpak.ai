const violationModel = require("../model/violationModel");
const vehicleModel = require("../model/vehiclesModel");
const moment = require("moment");
const path=require('path')


const createViolation = async (req, res) => {
  try {
    const ViolationReg = req.body;
    const {
      licensePlateNumber,
      violationType,
      status,
      date,
      time,
      location,
      videoUrl,
    } = ViolationReg;

    if (!licensePlateNumber) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter licensePlateNumber" });
    }
    if (!violationType) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter violationType" });
    }
    if (!status) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter status" });
    }
    if (!date) {
      return res.status(400).send({ status: false, msg: "please enter date" });
    }
    if (!time) {
      return res.status(400).send({ status: false, msg: "please enter time" });
    }
    if (!location) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter location" });
    }
    const media = {
      Image:[],
      Video:[]
  }

let files = req.files // file is the array
  
if (files && files.length > 0) {

const acceptableImageExtensions = ['png', 'jpg', 'jpeg', 'jpg']
const acceptableVideoExtensions = ['mp4','mkv']
for(let post of req.files){
if ((acceptableImageExtensions.some(extension => 
path.extname(post.originalname).toLowerCase() === `.${extension}`)
)){
media.Image.push(post.path)

}
if ((acceptableVideoExtensions.some(extension => 
path.extname(post.originalname).toLowerCase() === `.${extension}`)
)){
media.Video.push(post.path)

}
}
}else {
      return res.status(400).send({ msg: "No file found in request for video" })
}

ViolationReg.videoUrl = media.Video[0];

    let m = moment(
      date,

      "YYYY-MM-DD"
    );

    if (!m) {
      res.status(400).send({
        status: false,
        message: "Date Should be in these format YYYY-MM-DD",
      });
    }
    let t = moment(time,
       "h:mm:ss a");
    if (!t) {
      res.status(400).send({
        status: false,
        message: "Date Should be in these format YYYY-MM-DD",
      });
    }
      await violationModel.create(ViolationReg);
      let violationSaved = await violationModel
        .find({ licensePlateNumber: licensePlateNumber })
        .populate({ path: "licensePlateNumber", select: "manufacturerName" });

      return res.status(201).send({ status: true, msg: violationSaved });
    
  } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message });
  }
};

module.exports.createViolation = createViolation;

const getViolation = async (req, res) => {
  try {
   
    let violation = await violationModel.find({
      isDeleted: false,
    });
    console.log(violation);
    if (violation.length > 0) {
      return res.status(200).send({
        status: true,
        message: " got all Violation register",
        data: violation,
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
module.exports.getViolation = getViolation;
