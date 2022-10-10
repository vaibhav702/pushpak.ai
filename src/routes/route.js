const express = require("express");
const router = express.Router();
const vehicleController=require("../controller/vehicleController")
const ViolationController=require("../controller/violationController")
const middleware=require("../middleware/rateLimitter")



// vehicle 
router.post("/registerVehicle",middleware.rateLimiterUsingThirdParty,vehicleController.registerVehicles)
router.get("/getVehiclebyId/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.getRegisterVehicleById)
router.get("/getAllVehicle",middleware.rateLimiterUsingThirdParty,vehicleController.getAllVehicle)
router.put("/updateRegisterVehicle/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.updateVehicle)
router.delete("/deleteVhicle/:_id",middleware.rateLimiterUsingThirdParty,vehicleController.deleteVehicleById)

//violation getViolation
router.post("/registerViolation",middleware.rateLimiterUsingThirdParty,ViolationController.createViolation)
router.get("/getViolation",middleware.rateLimiterUsingThirdParty,ViolationController.getViolation)

router.get("*", function (req, res) {
  res.status(404).send({ status: false, ERROR: "page not found" });
});
//-------------------------Exporting Router-----------------------------------------------------------------//
module.exports = router;