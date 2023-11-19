import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;