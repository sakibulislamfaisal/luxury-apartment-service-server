const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const checkLogin = require("../middleware/checkLogin");

router.post("/add-service", serviceController.createService);
router.get("/all-service", serviceController.getAllServices);
router.get("/review", serviceController.getAllReview);
router.get("/:id", serviceController.getServiceById);
router.post("/order", serviceController.serviceOrderPlaced);
router.get("/email/:email", serviceController.getServiceByEmail);
router.post("/add-review", serviceController.reviewService);

// router.route("/addTodo").post(todoController.createTodo);
// router.route("/addManyTodo").post(todoController.createManyTodo);
// router.route("updateOne/:id").put(todoController.updateTodo);
// router.route("/:id").put(todoController.updateManyTodo);
// // router.route("/allTodo").get(todoController.getAllTodo);
// router.get("/allTodo", checkLogin, todoController.getAllTodo);
// router.route("/specificTodo").get(todoController.getSpecificTodo);
// router.route("/:id").delete(todoController.deleteTodo);

// //route in  instance method static method and query helpers
// router.get("/active", todoController.activeTodo);
// router.get("/js", todoController.todoFindByJs);
// router.get("/language", todoController.todoFindByLanguage);

module.exports = router;
