import express, { Express,Request,Response } from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.get('/',(req : Request, res : Response) => {
    res.json({
        thing : true
    })
})

app.listen(PORT,() => {
    console.log(`llistening to PORT ${PORT}`)
})