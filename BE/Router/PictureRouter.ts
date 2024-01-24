import { Router } from "express";
import { Multipleupload, Singleupload } from "../utils/multer";
import { UploadingsinglePicture, uploadSinglePictureStreamifier, Readschool } from "../controller/PictureController";
import multer from "multer";


const SingleStream = multer({
    fileFilter: async function (req: any, file: any, callback: any) {
        var ext: any = file.mimetype
        console.log(file?.mimetype)
        if (ext !== "image/png" && ext !== "image/jpg" && ext !== "image/gif" && ext !== "image/jpeg") {
            return callback(new Error("Only images and zip are allowed"));
        }
        // I want next function to validate real ext of files here.
        callback(null, true);
    },

    limits: {
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
    },


}).single("singleimg")



const router: Router = Router()

router.route("/single").post(Singleupload, UploadingsinglePicture)
router.route("/single-stream").post(SingleStream, uploadSinglePictureStreamifier)
router.route("/read-picture").get(Readschool)

export default router