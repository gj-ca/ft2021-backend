require("dotenv").config()
const mongoose = require("mongoose")
const { CategoryModel } = require("./models/Category")
const { ProductModel } = require("./models/Product")

mongoose.connect("mongodb+srv://foo:bar@cluster0.odzgu.mongodb.net/ft2021MERN?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(async () => {
        require("./server")
    })
    .catch(err => console.log(err))
