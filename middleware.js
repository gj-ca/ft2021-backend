// import express from 'express'

const express = require("express")
const app = express()

function middleWareOne(req, res, next) {
    console.log("This is happening first")
    next()
}

function middleWareTwo(req, res, next) {
    console.log("This is happening second")
    next()
}

function middleWareThree(req, res, next) {
    console.log("This is happening third")
    next()
}

// Middle ware being used on all subsequent routes
app.use(middleWareOne)
app.use(middleWareTwo)
// app.use(middleWareThree)

app.get("/", middleWareThree, (req, res) => {
    console.log("Hit the route route route route")
    res.send("Hello World")
})

app.get("/users", (req, res) => {
    console.log("This is happening last")
    res.sendStatus(200)
})
app.get("/products", middleWareThree, (req, res) => {
    console.log("This is happening last")
    res.sendStatus(200)
})

app.listen(5000, () => console.log("Running on port 5000"))