const express = require("express")
const { Show, User } = require("../../models/index")
const { check, validationResult } = require("express-validator")

const showRouter = express.Router()

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

showRouter.post(
	"/",
	[check(["title", "genre", "available"]).not().isEmpty().trim(), check("title").isLength({ min: 4, max: 25 }), check("available").isBoolean()],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.json({ error: errors.array() })
		} else {
			const createShow = await Show.create(req.body)
			res.json(createShow)
		}
	}
)

showRouter.put("/:id", [check("title").isLength({ min: 4, max: 25 }).optional(), check("available").isBoolean().optional()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let showId = req.params.id
		let foundShow = await Show.findByPk(showId)
		let updateShow = await foundShow.update(req.body)
		res.json(updateShow)
	}
})

module.exports = {
	showRouter,
}
