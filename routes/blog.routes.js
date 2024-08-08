import express from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    uploadImageToCloudinary
} from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/createPost', createPost);
router.post('/uploadImg', uploadImageToCloudinary);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);


export default router;
