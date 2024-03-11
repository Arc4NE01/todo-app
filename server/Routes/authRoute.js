import express from "express";
import {
  registerController, loginController, testController
} from "../controllers/authController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleWare.js";

// router object
const router = express.Router();

// routing
// Register || Method Post
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// // get info
// router.get("/get-info", requireSignIn, getController)

// // Forgot Password || POST
// router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.send(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.send(200).send({ ok: true });
});

// // update profile
// router.put("/update-profile", requireSignIn, updateProfileController);

export default router;
