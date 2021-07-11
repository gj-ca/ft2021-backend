const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser") 
const {ProductModel} = require("../models/Product")
const { CategoryModel } = require("../models/Category")

// MiddleWare - Should be exported to separate file
// function findById(req, res, next) {
//     // connection to a database
//     req.product = productsArray.find(p => p.id == req.params.id)
//     next()
// }

router.get("/", async (req, res) => {
    // ProductModel.find().then(products => {
    //     res.send(products)
    // })
    const products = await ProductModel.find()
    res.send(products)
})

// Show
router.get("/:id", async (req, res) => {
    ProductModel
        .findOne({_id: req.params.id})
        .populate('category', 'name')
        .then(document => {
            if (!document) {
                res.status(404).send({message: "File Not Found"})
            } else {
                // const category = CategoryModel.findOne({_id:})
                res.send(document)
            }
        })
        .catch(err => res.status(404).send(err))
})

// Create
router.post("/", bodyParser.json(), (req, res) => {
    // ProductModel.create({
    //     name: req.body.name,
    //     desc: req.body.description,
    //     quantity: req.body.quantity
    // }, (err, doc) => {
    //     if (err) {
    //         res.status(422).send(err)
    //     } else {
    //         res.status(201).send(doc)
    //     }
    // })
    ProductModel.create({
        name: req.body.name,
        desc: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category
    })
    .then(doc => res.status(201).send(doc))
    .catch(err => res.status(422).send(err))
})

// Edit
router.put("/:id", bodyParser.json(), async (req, res) => {
    // const product = await ProductModel.findOne({quantity: 3, name: "Product 1"})
    ProductModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity
    }, {
        returnOriginal: false,
        omitUndefined: true
    })
    .then(doc => res.send(doc))
    .catch(err => res.send(err))
})

// Delete
router.delete("/:id", (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => res.send(err))
})

module.exports = router