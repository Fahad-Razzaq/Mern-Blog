import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM tbl_posts WHERE cat=?"
    : "SELECT * FROM tbl_posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM tbl_users u JOIN tbl_posts p ON u.id=p.uid WHERE p.id = ?";
  // "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM tbl_users u JOIN tbl_posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "SECRET_KEY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const postId = req.params.id;
    const q = "DELETE FROM tbl_posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("You can Delete only your own Posts!");

      return res.json("Post has been Deleted!");
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "SECRET_KEY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q =
      "INSERT INTO tbl_posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created.");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "SECRET_KEY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const postId = req.params.id;
    console.log(req.body,postId)
    const q =
      "UPDATE `tbl_posts` SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` =?";
      // "UPDATE tbl_posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      // req.body.date,
      // userInfo.id,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been updated.");
    });
  });
};
