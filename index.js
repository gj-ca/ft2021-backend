require("dotenv").config()
const mongoose = require("mongoose")
const { CategoryModel } = require("./models/Category")
const { ProductModel } = require("./models/Product")

function runSeedFile() {
    return new Promise(async (resolve, reject) => {
        // await CategoryModel.insertMany([{
        //     name: "blah"
        // }])
        await ProductModel.insertMany([{
            // name: "foo"
        }])
        resolve("Success")
    })
    
}

mongoose.connect("mongodb+srv://foo:bar@cluster0.odzgu.mongodb.net/ft2021MERN?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(async () => {
        // Shitty seed check
        pCount = await ProductModel.count()
        cCount = await CategoryModel.count()
        if (pCount == 0 || cCount == 0) {
            ProductModel.remove()
            CategoryModel.remove()
            await runSeedFile()
            console.log("Successfully Seeded")
        }
        require("./server")
    })
    .catch(err => console.log(err))
