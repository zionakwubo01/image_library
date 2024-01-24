import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
    }
})


// const file = 

export const Singleupload = multer({
    storage: storage,

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

}).single(
    "singleimg",

)
export const Multipleupload = multer({ storage: storage }).array(
    "multipleimg", 8
)