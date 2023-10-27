import express, { Express } from "express";
import dotenv from "dotenv"
import { middleWare } from "./api/middlewares/user";

dotenv.config()

const app: Express = express() 
app.use(express.urlencoded({ extended: true }))
middleWare(app)



app.post("/user/signup", (req, res) => {
    
})


app.listen(process.env.PORT, () => {
    console.log(`app has started @ ${process.env.PORT}`)
})