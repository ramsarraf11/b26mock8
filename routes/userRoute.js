const { Router } = require("express")
const { UserModel } = require("../models/postModel")


const user = Router();


user.post("/signup", async (req, res) => {
    try {
        let { email, password, confirmPassword } = req.body
        let checkData = UserModel.find({ email })
        if (checkData.length > 0) {
            res.send("User Already Present. Please Login")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                console.log(password)
                if (err) {
                    res.status(201).send(err)
                } else {
                    let details = ({ email, password:hash, confirmPassword })
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

module.exports = { user }