const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const { isValid, nameReg , fullnameReg, logoRegex, emailTest , mobileTest } = require("../Validation/validation") 


const interns = async function (req, res) {
    try {
        
        let data = req.body 
        const { name, email, mobile ,collegeName} = data 

        //VALIDATION FOR EMPTY VALUES.

        if(Object.keys(data).length === 0)
          return res.status(400).send({ status: false, message: "Please pass any data" })

        if(!isValid(name))
          return res.status(400).send({ status: false, message: "Please provide name" })
            
        if(!isValid(email))
          return res.status(400).send({ status: false, message: "Please provide email" })

        if(!isValid(mobile))
          return res.status(400).send({ status: false, message: "Please provide mobille number" })

        if(!isValid(collegeName))
          return res.status(400).send({ status: false, message: "Please provide collegeName" })


        // VALIDATING REGEX ACCORDINGLY.

        if(!fullnameReg.test(name))
          return res.status(400).send({status : false, message: "Special characters are not allowed in name" })
        
        if(!emailTest.test(email))
          return res.status(400).send({ status: false, message: "Email id is not correct" })

        if(!mobileTest.test(mobile))
          return res.status(400).send({ status: false, message: "mobile no. is not correct" })  

        if(!nameReg.test(collegeName))
          return res.status(400).send({ status: false, message: "Only lowercase characters are alloweed in college name" }) 
    
        
        // CHECKING FOR PRE EXISTING DATA.

        let checkMobileandEmail = await internModel.findOne({ $or:[ {mobile: mobile} , {email:email}] })
        if(checkMobileandEmail)
          return res.status(400).send({ status: false, message: "Mobile no or email Id is already registered." });

        let CheckCollegeName = await collegeModel.findOne({ name: collegeName })             
        if(!CheckCollegeName)
          return res.status(400).send({ status: false, message: "No similar college found" });

        let collegeId = CheckCollegeName._id

        // CREATING NEW INTERN DATA WITH GIVEN AND VERIFIED INFORMATION.

        let createdata = await internModel.create({ name, mobile, email, collegeId })
        return res.status(201).send({ status: true, data: createdata })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.interns = interns;


















