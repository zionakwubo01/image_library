import { Document, model, Schema } from "mongoose";


interface iPic {
    picture: string;
    pictures: Array<string>
}

interface iPicData extends iPic, Document { }

const PictureModel = new Schema<iPicData>({
    picture: {
        type: String
    }
},
    { timestamps: true }
)

export default model<iPicData>("picture", PictureModel)