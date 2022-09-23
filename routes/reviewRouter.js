const express = require("express");
const router = express.Router();
const upload = require("../util/multer");
const accessToken = require("../middleware/auth")

const { reviewController } = require("../controllers")

router.get("", reviewController.getReview)
router.post("", upload.single("image"), accessToken, reviewController.postReview);
router.patch("", upload.single("image"), accessToken, reviewController.editReview);
router.delete("", accessToken, reviewController.deleteReview);

module.exports = router