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

//associate a user with a show they have watched

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

//update the available property of a show
app.put("/shows/:id/available", async (req, res) => {
	const showId = req.params.id
	const getShow = await Show.findByPk(showId)

	if (getShow.availabe == 0) {
		getShow.update({ available: 1 })
	} else {
		getShow.update({ available: 0 })
	}

	res.send("Show's availabilty has been updated!")
})

//delete a show
app.delete("/shows/:id", async (req, res) => {
	const showId = req.params.id
	const deleteShow = await Show.destroy({ where: { id: showId } })
	res.send("Show has been deleted!")
})

//get shows of a particular genre
app.get("/shows/:genre", async (req, res) => {
	const showGenre = req.params.genre
	const getShowsGenre = await Show.findAll({ where: { genre: showGenre } })
	res.json(getShowsGenre)
})
