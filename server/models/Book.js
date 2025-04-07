import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    openLibraryId: {type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, enum: ["toRead", "favorites"], required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;