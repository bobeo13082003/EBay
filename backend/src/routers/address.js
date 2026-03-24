const express = require("express");
const router = express.Router();

const addressController = require("../controllers/address");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware.authMiddleware, addressController.createAddress);
router.patch("/:id/default", authMiddleware.authMiddleware, addressController.updateDefault);
router.get("/", authMiddleware.authMiddleware, addressController.getAddresses);
router.delete("/:id", authMiddleware.authMiddleware, addressController.deleteAddress);

module.exports = router;
