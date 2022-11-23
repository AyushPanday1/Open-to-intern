// This file consists of every validation and regex shortly.


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

let nameReg = /^[a-z]+$/
let fullnameReg = /^[.a-zA-Z\s,-]+$/
let logoRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
let emailTest = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
let mobileTest = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/


module.exports = { isValid, nameReg , fullnameReg,logoRegex, emailTest , mobileTest}