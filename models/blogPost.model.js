import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    autor: { type: String, required: true },
    fecha: { type: Date, required: true }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
