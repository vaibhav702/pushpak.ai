const violationModel = require("../model/violationModel");
const vehicleModel = require("../model/vehiclesModel");
const moment = require("moment");
const aws = require("aws-sdk");
// aws.config.update({
//   accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//   secretAccessKey: "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",
//   region: "ap-south-1",
// });

// let uploadFile = async (file) => {
//   return new Promise(async function (resolve, reject) {
//     // Promise.reject(reason) Returns a new Promise object that is rejected with the given reason.
//     // Promise.resolve(value) Returns a new Promise object that is resolved with the given value.
//     let s3 = new aws.S3({ apiVersion: "2006-03-01" }); //we will be using s3 service of aws

//     var uploadParams = {
//       ACL: "public-read",
//       Bucket: "classroom-training-bucket",
//       Key: "vaibhav/" + file.originalname,
//       Body: file.buffer,
//     };

//     s3.upload(uploadParams, function (err, data) {
//       if (err) {
//         return reject({ error: err });
//       }

//       console.log(data);
//       console.log(" file uploaded succesfully ");
//       return resolve(data.Location); // HERE
//     });
//   });
// };

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
