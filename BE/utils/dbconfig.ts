import { connect } from "mongoose"



const Url: string = "mongodb://localhost:27017/Imagedb"
export const dbconfig = async () => {
    try {
        await connect(Url).then(() => {
            console.log("database active")
        })
    } catch (error) {
        return error
    }
}