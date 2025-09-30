const { Router } = require("express");

const {
  signupUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controllers/user.controller");

const verifyJWT = require("../middleware/auth.middleware");

const router = Router();

router.post("/signup", signupUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;

