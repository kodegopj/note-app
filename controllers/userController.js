import bcrypt from "bcrypt";
import User from "../models/User.js";

async function getUsers(req, res) {
  const users = await User.find({}).populate("notes", {
    content: 1,
    important: 1,
  });
  return res.json(users);
}

async function createUser(req, res, next) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
};
