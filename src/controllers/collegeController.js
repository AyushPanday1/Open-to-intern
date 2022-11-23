const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const { isValid, nameReg, fullnameReg, logoRegex } = require("../Validation/validation")

const createCollege = async function (req, res) {

    try {
         let data = req.body;

        if(Object.keys(data).length == 0)
          return res.status(400).send({ status: false, message: "Please enter the all the fields" });

         const { name, fullName, logoLink } = data

        // CHECKING FOR EMPTY VALUES.

        if(!isValid(name))
          return res.status(400).send({ status: false, message: "Please provide name" })

        if(!isValid(fullName))
          return res.status(400).send({ status: false, message: "Please provide fullName" })

        if(!isValid(logoLink))
          return res.status(400).send({ status: false, message: "Please provide logoLink" })


        // PASSING AND CHECKING REGEX.

        if(!nameReg.test(name)) 
          return res.status(400).send({ status: false, message: "Name should be in valid format" })
        

        if(!fullnameReg.test(fullName)) 
          return res.status(400).send({ status: false, message: "fullName should be in valid format" })
        

        if(!logoRegex.test(logoLink)) 
           return res.status(400).send({ status: false, message: "logoLink should be in valid format" });
        
         let checkName = await collegeModel.findOne({ name })

        if(checkName)
          return res.status(400).send({ status: false, message: " name is already registered." });

        // CREATING NEW DATA WITH ABOVE INFORMATION.

        let savedcollege = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: savedcollege })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



const listOfCollageIntern = async function (req, res) {

    try {

        let data = req.query.collegeName
        let validKey = Object.keys(req.query)

        if(!["collegeName"].includes(...validKey))
          return res.status(400).send({ status: false, message: "query can only be collegeName" })

        if(data.trim().length === 0)
          return res.status(400).send({ status: false, message: "please provide collage name" })

        let collegeId = await collegeModel.findOne({ name: data })
        if(!collegeId)
          return res.status(404).send({ status: false, message: "College does not found" })

        if(collegeId.isDeleted)
          return res.status(400).send({ status: false, message: "This college does not provide internship" })

        let internsNameWithCollege = await internModel.find({ collegeId: collegeId._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        if(internsNameWithCollege.length === 0)
          return res.status(400).send({ status: false, message: "NO intern found from this college" })

        let NewData = {
            name: collegeId.name,
            fullName: collegeId.fullName,
            logoLink: collegeId.logoLink,
            interns: internsNameWithCollege
        }
        return res.status(200).send({ status: true, data: NewData })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { listOfCollageIntern, createCollege }
