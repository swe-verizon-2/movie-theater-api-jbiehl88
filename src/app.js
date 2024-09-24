const express = require("express")
const app = express()
const { Show, User } = require("../models/index")
const db = require("../db/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//****User routes****

//get all users
app.get("/users", async (req, res) => {
	const getUsers = await User.findAll({})
	res.json(getUsers)
})

//get one user
app.get("/users/:id", async (req, res) => {
	const userId = req.params.id
	const getUser = await User.findByPk(userId)
	res.json(getUser)
})

//get all shows watched by a user
app.get("/users/:id/shows", async (req, res) => {
	const userId = req.params.id
	const userShows = await User.findByPk(userId, { include: Show })
	res.json(userShows)
})

//associate a user with a show they have watched
app.put("/users/:id/shows/:showid", async (req, res) => {
	const userId = req.params.id
	const showId = req.params.showid
	const show = await Show.findByPk(showId)
	const user = await User.findByPk(userId)
	await user.addShow(show)
	const updatedUser = await User.findByPk(userId, { include: Show })
	res.json(updatedUser)
})

//****Show routes****

//get all shows
app.get("/shows", async (req, res) => {
	const getShows = await Show.findAll({})
	res.json(getShows)
})

//get one show
app.get("/shows/:id", async (req, res) => {
	const showId = req.params.id
	const getShow = await Show.findByPk(showId)
	res.json(getShow)
})

//get all users who watched a show
app.get("/shows/:id/users", async (req, res) => {
	const showId = req.params.id
	const showsUser = await Show.findByPk(showId, { include: User })
	res.json(showsUser)
})

//update the available property of a show
app.put("/shows/:id/available", async (req, res) => {
	const showId = req.params.id
	let getShow = await Show.findByPk(showId)
	let updatedShow = await getShow.update({ available: !getShow.available })
	res.json(updatedShow)
})

//delete a show
app.delete("/shows/:id", async (req, res) => {
	const showId = req.params.id
	const deleteShow = await Show.destroy({ where: { id: showId } })
	res.json(deleteShow)
})

//get shows of a particular genre
app.get("/shows/genre/:genre", async (req, res) => {
	const showGenre = req.params.genre
	const getShowsGenre = await Show.findAll({ where: { genre: showGenre } })
	res.json(getShowsGenre)
})

module.exports = app
