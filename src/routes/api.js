const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

// user login
router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/profileUpdate", AuthMiddleware, UserController.profileUpdate);
router.get("/profileDetails", AuthMiddleware, UserController.profileDetails);
router.get("/verifyEmail/:email", UserController.verifyEmail);
router.get("/verifyOTP/:email/:otp", UserController.verifyOTP);
router.get(
  "/passwordReset/:email/:otp/:password",
  UserController.passwordReset
);

// task create. task update, task delete, task update
router.post("/task/create", AuthMiddleware, TaskController.create);
router.post("/task/update/:id", AuthMiddleware, TaskController.update);
router.post(
  "/task/updateStatus/:id",
  AuthMiddleware,
  TaskController.updateStatus
);
router.get("/task/read", AuthMiddleware, TaskController.read);
router.get("/task/delete/:id", AuthMiddleware, TaskController.delete);

module.exports = router;
