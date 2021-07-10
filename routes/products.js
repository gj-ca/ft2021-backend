const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser") 

let productsArray = [
    {
        id: 1,
        name: "Product 1",
        description: "Desc 1"
    }, {
        id: 2,
        name: "Product 2",
        description: "Desc 2"
    }, {
        id: 3,
        name: "Product 3",
        description: "Desc 3"
    }, 
]

// MiddleWare - Should be exported to separate file
function findById(req, res, next) {
    // connection to a database
    req.product = productsArray.find(p => p.id == req.params.id)
    next()
}

router.get("/", (req, res) => {
    res.send(productsArray)
})

// Show
router.get("/:id", findById, (req, res) => {
    res.send(req.product)
})

// Create
router.post("/", bodyParser.json(), (req, res) => {
    const newProduct = {
        id: productsArray.length + 1,
        name: req.body.name,
        description: req.body.description
    }
    productsArray.push(newProduct)
    res.status(201).send(newProduct)
})

// Edit
router.put("/:id", findById, bodyParser.json(), (req, res) => {
    req.product.name = req.body.name
    req.product.description = req.body.description
    res.send(req.product)
})

// Delete
router.delete("/:id", (req, res) => {
    productsArray = productsArray.filter(p => p.id != req.params.id)
    res.sendStatus(204)
})

module.exports = router