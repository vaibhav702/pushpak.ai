const express = require("express");
const router = express.Router();
const vehicleController=require("../controller/vehicleController")
const ViolationController=require("../controller/violationController")
const middleware=require("../middleware/rateLimitter")

const multer = require('multer')
const path = require('path') // node built-in path package

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() +'/public/')
    },
    filename: function (req, file, cb) {
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
        const timestamp = Date.now()
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, originalName + '_' + timestamp + extension)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 55 * 1024 * 1024 }, // 1 Mb
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['png','jpg', 'jpeg', 'jpg','mp4']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        //req.file = file
        callback(null, true)
    }
})

const any = ((req, res, next)=>{

    router.use(multer().any())
    next();
})


// vehicle 
router.post("/registerVehicle",middleware.rateLimiterUsingThirdParty,vehicleController.registerVehicles)
router.get("/getVehiclebyId/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.getRegisterVehicleById)
router.get("/getAllVehicle",middleware.rateLimiterUsingThirdParty,vehicleController.getAllVehicle)
router.put("/updateRegisterVehicle/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.updateVehicle)
router.delete("/deleteVhicle/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.deleteVehicleById)

//violation getViolation
router.post("/registerViolation",upload.array('file',1),any,middleware.rateLimiterUsingThirdParty,ViolationController.createViolation)
router.get("/getViolation",middleware.rateLimiterUsingThirdParty,ViolationController.getViolation)

router.get("*", function (req, res) {
  res.status(404).send({ status: false, ERROR: "page not found" });
});
//-------------------------Exporting Router-----------------------------------------------------------------//
module.exports = router;