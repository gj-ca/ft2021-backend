const express = require("express")
const app = express()
const cors = require("cors")
const { CategoryModel } = require("./models/Category")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require("passport")
const bodyParser = require("body-parser")
const {UserModel} = require('./models/User');
 
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://foo:bar@cluster0.odzgu.mongodb.net/ft2021MERN?retryWrites=true&w=majority"
        })
}))

app.use(cookieParser("secret"))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

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