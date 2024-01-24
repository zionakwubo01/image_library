import axios from "axios"

const url: string = "http://localhost:3355/single"
const url2: string = "http://localhost:3355"

export const Readpictures = async () => {
    try {

        return await axios.get(`${url2}/read-picture`).then((res) => {
            return res.data
        })

    } catch (error) {
        return error
    }
}

export const Createpictures = async (data: any) => {
    try {

        const config: any = { "content-type": "multipart/formdata" }

        return await axios.post(url, data, config).then((res) => {
            return res.data
        })

    } catch (error) {
        return error
    }
}