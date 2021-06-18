const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const checkLogin = require("../middleware/checkLogin");
router.get("/all-order", serviceController.getAllServiceOrder);
router.post("/add-service", serviceController.createService);
router.get("/all-service", serviceController.getAllServices);
router.get("/review", serviceController.getAllReview);
router.get("/:id", serviceController.getServiceById);
router.post("/order", serviceController.serviceOrderPlaced);
router.get("/email/:email", serviceController.getServiceByEmail);
router.post("/add-review", serviceController.reviewService);



module.exports = router;
