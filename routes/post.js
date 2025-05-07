import express from 'express';
import * as postController from '../controllers/postController.js';
import {middlewareAuth} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostByID);
router.post('/', middlewareAuth, postController.createPost);
router.put('/', middlewareAuth, postController.updatePost);
router.delete('/', middlewareAuth, postController.deletePost);

export {
    router
};