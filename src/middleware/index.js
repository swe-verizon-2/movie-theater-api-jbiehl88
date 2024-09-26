const { check } = require("express-validator")

//show validators
const showTitleLength = check("title").isLength({ min: 4, max: 25 }).optional()
const showAvailCheck = check("available").isBoolean().optional()
const showCheckMostNotEmptyTrim = check(["title", "genre", "available"]).not().isEmpty().trim()

//user validators
const userCheckAllNotEmptyTrim = check(["username", "password"]).not().isEmpty().trim()
const userCheckEmail = check("username").isEmail()
const userCheckPassword = check("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })

module.exports = {
	showTitleLength,
	showAvailCheck,
	showCheckMostNotEmptyTrim,
	userCheckAllNotEmptyTrim,
	userCheckEmail,
	userCheckPassword,
}
