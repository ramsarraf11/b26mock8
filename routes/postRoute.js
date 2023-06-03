const { Router } = require("express")
const { postModel } = require("../models/postModel")


let post = Router()


//{ name, description, category, image, location, postedAt, price }
post.post("/post", async (req, res) => {
    try {
        let details = req.body
        let data = new postModel(details)
        await data.save()
        res.send(`post addition success ${data}`)
    } catch (error) {
        res.send(error)
    }
})


module.exports={post}