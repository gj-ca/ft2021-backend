const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {CategoryModel} = require("./Category")

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: name => {
                if (name.includes("fuck")) {
                    return false
                }
            },
            message: "No naughty words"
        }
    },
    description: {
        type: String,
        default: "No description yet!"
    },
    quantity: {
        type: Number,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    imageUrl: String,
    cloudinaryId: String,
})

ProductSchema.post("save", async (document, next) => {
    const category = await CategoryModel.findOne({_id: document.category})
    category.products.push(document._id)
    category.save()
    next()
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = {
    ProductModel,
    ProductSchema
}

