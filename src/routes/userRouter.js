const express = require("express")
const { Show, User } = require("../../models/index")

const userRouter = express.Router()

//****User routes****

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

module.exports = {
	userRouter,
}
