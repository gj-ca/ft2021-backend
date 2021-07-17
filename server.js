const express = require("express")
const app = express()
const cors = require("cors")
const { CategoryModel } = require("./models/Category")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MongoStore = require('connect-mongo');
 
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(session({
        secret: "this is our little secret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://foo:bar@cluster0.odzgu.mongodb.net/ft2021MERN?retryWrites=true&w=majority"
        })
}))

app.use(cookieParser("this is our little secret"))

require("./utils/passport")

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.use("/products", require("./routes/products"))

app.use("/users", require("./routes/users"))

app.get("/categories", async (req, res) => {
    CategoryModel
        .find()
        .populate("products", "name description quantity")
        .then(categories => res.send(categories))
})

app.listen(5000, () => console.log("Running on port 5000"))