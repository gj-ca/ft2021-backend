require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors({
    origin: process.env.ORIGIN
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.use("/products", require("./routes/products"))

app.listen(5000, () => console.log("Running on port 5000"))