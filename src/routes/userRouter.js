const express = require("express")
const { Show, User } = require("../../models/index")
const { check, validationResult } = require("express-validator")
const { userCheckAllNotEmptyTrim, userCheckEmail, userCheckPassword } = require("../middleware/index")

const userRouter = express.Router()

//get all users
userRouter.get("/", async (req, res) => {
	const getUsers = await User.findAll({})
	res.json(getUsers)
})

//get one user
userRouter.get("/:id", async (req, res) => {
	const userId = req.params.id
	const getUser = await User.findByPk(userId)
	res.json(getUser)
})

//get all shows watched by a user
userRouter.get("/:id/shows", async (req, res) => {
	const userId = req.params.id
	const userShows = await User.findByPk(userId, { include: Show })
	res.json(userShows)
})

//associate a user with a show they have watched
userRouter.put("/:id/shows/:showid", async (req, res) => {
	const userId = req.params.id
	const showId = req.params.showid
	const show = await Show.findByPk(showId)
	const user = await User.findByPk(userId)
	await user.addShow(show)
	const updatedUser = await User.findByPk(userId, { include: Show })
	res.json(updatedUser)
})

userRouter.post("/", [userCheckAllNotEmptyTrim, userCheckEmail, userCheckPassword], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		const createUser = await User.create(req.body)
		res.json(createUser)
	}
})

userRouter.put("/:id", [userCheckEmail.optional(), userCheckPassword.optional()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let userId = req.params.id
		let foundUser = await User.findByPk(userId)
		let updateUser = await foundUser.update(req.body)
		res.json(updateUser)
	}
})

module.exports = {
	userRouter,
}
