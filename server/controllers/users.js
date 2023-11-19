import mongoose from "mongoose";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) return res.status(403).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'sanket', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstname, lastname } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(406).json({ message: "User already exist" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email: email, password: hashedPassword, name: `${firstname} ${lastname}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'sanket', { expiresIn: "1h" });

        res.status(201).json({ result: result, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}