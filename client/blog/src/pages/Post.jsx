import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Menu from "../components/menu/Menu";
import { AuthContext } from "../context/authContext";
import "./page-styles/post.scss";
import DOMPurify from "dompurify";

const Post = () => {
  document.title = `Post Title - Dev Log`;
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const Text = (htmlText) => {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="post">
      <div className="content">
        <article>
          <img
            src={`../images/${post.img}`}
            alt=""
            className="cover cover-image thumbnail"
          />
          <div className="author">
            <div className="user">
              {post.userImg ? <img src={post.userImg} alt="" /> : null}
              <div className="info">
                <span>{post.username}</span>
                <p>Posted 1 day ago</p>
                {/* <p>Posted {moment(post.date).fromNow}</p> */}
              </div>
              {currentUser?.username === post.username ? (
                <div className="actions">
                  <Link to={`/write?edit=2`} state={post}>
                    <button className="edit">Edit</button>
                  </Link>
                  <button onClick={handleDelete} className="delete">
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <hr />

          <div className="post-content">
            <h1>{post.title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          </div>
        </article>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Post;
