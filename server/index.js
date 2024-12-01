import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import MODEL with .js
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/Posts.js";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString =
  "mongodb+srv://postITDb:postITDb12345@postitcluster.ktdze.mongodb.net/postITDb?retryWrites=true&w=majority&appName=PostITCluster";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(__dirname + "/uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// --------- API Code ----------
app.post("/registerUser", async (req, res) => {
  try {
    // Get the Values from the request body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    // Assign the values from the request body to the MODLE
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.delete("/deleteUser", async (req, res) => {});
app.put("/updateUser", async (req, res) => {});
app.get("/viewrUsers", async (req, res) => {});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //search the user
    const user = await UserModel.findOne({ email: email });

    //if not found
    if (!user) {
      return res.status(500).json({ error: "User not found." }); // we use return not console.log because console for the devolober and if it is false it will continue not stop the return stop the code if there any error
    }
    console.log(user);

    //password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    //if user is found, password match
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Post API-logout
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//Post API - savePost
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Get API - getPost
app.get("/getPosts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//PUT API - likePost
app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  try {
    const postToUpdate = await PostModel.findOne({ _id: postId });

    if (!postToUpdate) {
      return res.status(404).json({ msg: "post not found." });
    }

    const userIndex = postToUpdate.likes.users.indexOf(userId);

    if (userIndex !== -1) {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": -1 },
          $pull: { "likes.users": userId },
        },
        { new: true }
      );

      res.json({ post: updatedPost, msg: "Post unliked." });
    } else {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ post: updatedPost, msg: "Post Liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occured" });
  }
});

app.put(
  "/updateUserProfile/:email/",
  upload.single("profilePic"),
  async (req, res) => {
    const email = req.params.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
      const userToUpdate = await UserModel.findOne({ email: email });

      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }

      let profilePic = null;
      if (req.file) {
        profilePic = req.file.filename;
        if (userToUpdate.profilePic) {
          const oldFilePath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
          );
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Old file deleted successfully");
            }
          });
          userToUpdate.profilePic = profilePic;
        }
      } else {
        console.log("No file uploaded");
      }

      userToUpdate.name = name;
      if (password !== userToUpdate.password) {
        const hashedPassword  = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword ;
      } else {
        userToUpdate.password = password;
      }
      await userToUpdate.save();
      res.send({ user: userToUpdate, msg: "Updated." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.listen(3001, () => {
  console.log("You are connected");
});
