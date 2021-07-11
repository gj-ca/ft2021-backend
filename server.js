const express = require("express")
const app = express()
const cors = require("cors")
const { CategoryModel } = require("./models/Category")


app.use(cors({
    origin: process.env.ORIGIN
}))

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.use("/products", require("./routes/products"))

app.get("/categories", async (req, res) => {
    CategoryModel
        .find()
        .populate("products", "name description quantity")
        .then(categories => res.send(categories))
})

app.listen(5000, () => console.log("Running on port 5000"))