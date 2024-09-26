const express = require("express")
const app = express()
const { userRouter } = require("./routes/userRouter")
const { showRouter } = require("./routes/showRouter")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)
app.use("/shows", showRouter)

module.exports = app
