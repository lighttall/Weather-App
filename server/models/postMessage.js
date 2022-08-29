import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  name: String,
  message: String,
  title: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
