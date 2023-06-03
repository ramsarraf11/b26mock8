const { Router } = require("express")
const { UserModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


let user = Router();


user.post("/signup", async (req, res) => {
    try {
        let { email, password, confirmPassword } = req.body
        let checkData = UserModel.find({ email })
        if (checkData.length > 0) {
            res.send("User Already Present. Please Login")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                //console.log(password)
                if (err) {
                    res.status(201).send(err)
                } else {
                    let details = ({ email, password: hash, confirmPassword })
                    let data = new UserModel(details)
                    await data.save()
                    res.send(`user registration success ${data}`)
                }
            });
        }
    } catch (error) {
        res.send(error)
    }
})

user.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await UserModel.find({ email })
        //console.log(user)
        let hashPass = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashPass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ email }, "masai")
                    res.send({ message: "login success", "token": token })
                } else {
                    res.send({ "err": err, "message": "Invalid Password" })
                }
            });
        } else {
            res.send("User Not Found")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = { user }