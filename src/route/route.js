const express = require("express")
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")


// to create colleges
router.post("/functionup/colleges", collegeController.createCollege)

// to create interns
router.post("/functionup/interns", internController.interns)

//to get list for all the interns
router.get("/functionup/collegeDetails", collegeController.listOfCollageIntern)

// Validating
router.all("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "your end point is not correct" })
})

module.exports = router




