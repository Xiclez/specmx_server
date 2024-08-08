import BlogPost from '../models/blogPost.model.js';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dgyepdjut/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'specmx';

export const uploadImageToCloudinary = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.image;
        const tempFilePath = file.tempFilePath;

        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath));
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal

        res.json({ url: response.data.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload images to Cloudinary' });
    }
};

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
