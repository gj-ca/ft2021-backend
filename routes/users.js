const bodyParser = require("body-parser")
const express = require("express")
const passport = require("passport")
const router = express.Router()
const {UserModel} = require("../models/User")

router.post("/sign_up", bodyParser.json(), (req,res) => {
    // console.log(req.body)
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

router.post("/login", bodyParser.json(), (req,res) => {
    console.log(req.body)
    res.sendStatus(200)
})



module.exports = router