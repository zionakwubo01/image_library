import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary"
import PictureModel from "../model/PictureModel";
import streamifier from "streamifier"




export const UploadingsinglePicture = async (req: any, res: Response) => {
    try {

        const { secure_url } = await cloudinary.uploader.upload(req?.file!.path)
        console.log(secure_url)
        const pic = await PictureModel.create({ picture: secure_url })

        return res.status(201).json({
            message: "uploaded successfully",
            data: pic,
            status: 201
        })
    } catch (error: any) {
        return res.status(404).json({
            message: error.message
        })
    }
}
export const UploadingmultiplePicture = async (req: any, res: Response) => {
    try {

        const { secure_url } = await cloudinary.uploader.upload(req?.file!.path)

        const pic = await PictureModel.create({ picture: secure_url })

        return res.status(201).json({
            message: "uploaded successfully",
            data: pic
        })
    } catch (error) {
        return res.status(404).json({
            message: "error uploading"
        })
    }
}


export const uploadSinglePictureStreamifier = async (
    req: any,
    res: Response
) => {
    try {
        let streamUpload = (req: any) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req: any) {
            let result = await streamUpload(req);
            return result;
        }

        const { secure_url }: any = await upload(req);

        const picture = await PictureModel.create({
            picture: secure_url,
        });

        return res.status(201).json({
            message: "uploading picture done",
            data: picture,
            status: 201,
        });
    } catch (error: any) {
        return res.status(404).json({
            message: error.message,
            status: 404,
        });
    }
};




export const Readschool = async (req: Request, res: Response) => {
    try {

        const pics = await PictureModel.find()

        return res.status(201).json({
            message: "found",
            data: pics
        })

    } catch (error) {
        return res.status(404).json({
            message: "error"
        })
    }
}