const express = require("express")
const app = express()
const { showRouter, userRouter } = require("./routes/router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)
app.use("/shows", showRouter)

module.exports = app
