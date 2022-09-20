const express = require("express");
const router = express.Router();
const upload = require("../util/multer");

const { reviewController } = require("../controllers")

router.post("/", upload.single("image"), reviewController.postReview);
router.patch("/", upload.single("image"), reviewController.editReview);
router.delete("/", reviewController.deleteReview);

module.exports = router