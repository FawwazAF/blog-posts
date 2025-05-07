import Post from '../models/post.js';

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({
      message : "success", 
      data : posts,
    });
  } catch (err) {
    res.status(500).json({error : err.message})
  }
};

const getPostByID = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({error : err.message})
  }
};

const createPost = async (req, res) => {
  const {
    content = "",
  } = req.body;

  const authorId = req.user.id;
  if (authorId === 0) {
    res.status(400).json({
      error: "Unauthorized"
    })
    return
  }

  try {
    const post = await Post.create({
      content: content,
      authorId: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      message: "success",
      data: {
        post,
      }
    });
  } catch (err) {
    res.status(500).json({error : err.message})
  }
};

const updatePost = async (req, res) => {
  const {
    id = 0,
    content = "",
  } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findByPk(id);
    if (post.authorId !== userId) {
        res.status(403).json({status: 403, message : "Forbidden"})
        return
    }

    await post.update({ content: content });
    res.json({status: 200, message: "success"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  const {
    id = 0,
  } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findByPk(id);
    if (post.authorId !== userId) {
      res.status(403).json({status: 403, message : "Forbidden"})
      return
    }

    await post.destroy();
    res.json({ message: `Post ${post.id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
    getAllPost, 
    getPostByID,
    createPost,
    updatePost,
    deletePost,
}