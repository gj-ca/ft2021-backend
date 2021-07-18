const bodyParser = require("body-parser")
const express = require("express")
const passport = require("passport")
const router = express.Router()
const {UserModel} = require("../models/User")

router.post("/sign_up", (req,res) => {
    UserModel.register(req.body, req.body.password, (err, user) => {
        if (err) {
            res.status(401).send({message: err.message})
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send({_id: user._id, username: user.username})
            })
        }
    })
    // .catch(() => console.log("There was an error"))
})

router.post("/login", passport.authenticate('local'), (req,res) => {
    res.status(200).send({username: req.user.username, _id: req.body._id})
})

router.get("/logout", (req, res) => {
    req.logout()
    res.send(200)
})

router.get("/me", (req,res) => {
    if (req.user) {
        res.status(200).send({username: req.user.username, _id: req.user.id})
    } else {
        res.sendStatus(401)
    }
})



module.exports = router