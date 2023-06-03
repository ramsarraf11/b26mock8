const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String
})

const UserModel = new mongoose.model("userdata", userSchema)

module.exports = { UserModel }