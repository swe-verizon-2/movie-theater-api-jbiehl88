const express = require("express")
const { Show, User } = require("../../models/index")

const showRouter = express.Router()

//****Show routes****

//get all shows
showRouter.get("/", async (req, res) => {
	const getShows = await Show.findAll({})
	res.json(getShows)
})

//get one show
showRouter.get("/:id", async (req, res) => {
	const showId = req.params.id
	const getShow = await Show.findByPk(showId)
	res.json(getShow)
})

//get all users who watched a show
showRouter.get("/:id/users", async (req, res) => {
	const showId = req.params.id
	const showsUser = await Show.findByPk(showId, { include: User })
	res.json(showsUser)
})

//update the available property of a show
showRouter.put("/:id/available", async (req, res) => {
	const showId = req.params.id
	let getShow = await Show.findByPk(showId)
	let updatedShow = await getShow.update({ available: !getShow.available })
	res.json(updatedShow)
})

//delete a show
showRouter.delete("/:id", async (req, res) => {
	const showId = req.params.id
	const deleteShow = await Show.destroy({ where: { id: showId } })
	res.json(deleteShow)
})

//get shows of a particular genre
showRouter.get("/genre/:genre", async (req, res) => {
	const showGenre = req.params.genre
	const getShowsGenre = await Show.findAll({ where: { genre: showGenre } })
	res.json(getShowsGenre)
})

module.exports = {
	showRouter,
}
