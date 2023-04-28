import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    date : String,
    topic : String,
    desc : String,
    mistakes : String,
    summary : String
},
{
    timestamps : true
}
)

const Model = mongoose.model('Posts',Schema)

export default Model