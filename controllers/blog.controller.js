import BlogPost from '../models/blogPost.model.js';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';


export const createPost = async (req, res) => {
    try {
        const { title, content, images, autor } = req.body;
        const fecha = new Date(); 
        const newPost = new BlogPost({ title, content, images, autor, fecha });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { title, content, images, autor, fecha } = req.body;
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { title, content, images, autor, fecha },
            { new: true }
        );
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (deletedPost) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
