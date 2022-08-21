const express = require("express")
const router = express.Router() 
const {getproducts, getproductstatic} = require("../controller/store")

router.get("/", getproducts);
router.get("/static", getproductstatic);

module.exports = router
