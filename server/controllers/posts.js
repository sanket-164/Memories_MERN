import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "Post is not a valid" });

    try {
        const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "Post is not a valid" });

    try {
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) res.status(401).json({ message: "Unathorized" });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "Post is not valid" });

    try {
        const post = await PostMessage.findById(_id);

        const index = await post.likes.findIndex((id) => id === String(req.userId));
        console.log(index)
        if (index === -1) {
            post.likes.push(req.userId);
        }
        else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}