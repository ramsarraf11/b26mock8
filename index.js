const express = require("express")
require('dotenv').config()
const cors = require("cors")


const { connection } = require("./configs/db")
const { user } = require("./routes/userRoute")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.use( user)


app.listen((process.env.port), async () => {
    try {
        await connection
        console.log(`db is connected`)
    } catch (error) {
        console.log(error)
    }
    console.log(`server is on ${process.env.port}`)
})