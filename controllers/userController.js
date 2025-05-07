import  User  from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
  const {
    username = "", 
    email = "",
    password = "",
  } = req.body;

  if (username === "") {
    res.status(400).json({
      error: "username cannot be empty"
    })
    return
  }

  if (email === "") {
    res.status(400).json({
      error: "email cannot be empty"
    })
    return
  }

  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "invalid email"
    })
    return
  }

  if (password === "") {
    res.status(400).json({
      error: "password cannot be empty"
    })
    return
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser.id !==  0) {
      res.status(400).json({
        error: "email already been used"
      })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: username, email, password: hashedPassword });
    res.status(200).json({
      message: "success",
      data: {
        username: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const {
    email = "",
    password = "",
  } = req.body;

  if (email === "") {
    res.status(400).json({
      error: "email cannot be empty"
    })
    return
  }

  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "invalid email"
    })
    return
  }

  if (password === "") {
    res.status(400).json({
      error: "password cannot be empty"
    })
    return
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ 
      message : "success",
      data: {
        token: token,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export{
    register, 
    login,
}