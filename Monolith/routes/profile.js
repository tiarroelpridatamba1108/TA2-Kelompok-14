const express = require("express");

const profileController = require("../controllers/profile");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.get("/profile", isAuth.isAuthenticated, profileController.getProfile);

router.get("/profile/edit", isAuth.isAuthenticated, profileController.getEditProfile);

router.get("/profile/password", isAuth.isAuthenticated, profileController.getUpdatePassword);

router.post("/profile", isAuth.isAuthenticated, profileController.postEditProfile);

router.post("/profile/password", isAuth.isAuthenticated, profileController.postUpdatePassword);

module.exports = router;
