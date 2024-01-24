import express, { Application } from "express"
import cors from "cors"
import { dbconfig } from "./utils/dbconfig"
import upload from "./Router/PictureRouter"
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use("/", upload)

const port: number = 3355

app.listen(port, () => {
    console.log("server established")
    dbconfig()
})

