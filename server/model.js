import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    // date : String,
    summary : String,
    topic : String,
    desc : String,
    mistakes : String,
    username : String,
    tag : [String]
},
{
    timestamps : true
}
)

const Model = mongoose.model('Posts',Schema)

export default Model