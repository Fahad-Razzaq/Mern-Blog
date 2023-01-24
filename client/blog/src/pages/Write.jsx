import React from "react";
import "./page-styles/write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  document.title = "Write a Post - Dev Log";

  const state = useLocation().state;
  const navigate = useNavigate();

  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  // if (!state){
  //   setTitle("")
  //   setValue("")
  //   setFile(null)
  //   setCat("")
  // }

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await uploadImg();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title: title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title: title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          setMsg("Task Completed")
      navigate("/");
    } catch (err) {
      setErr(err)
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="content">
        {err ? (
          <div id="error" className="messageBar">
            {err}
          </div>
        ) : null}
        {msg ? (
          <div id="success" className="messageBar">
            {msg}
          </div>
        ) : null}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
      <div className="menu">
        <div className="item post-options">
          <h2 className="options">Options</h2>
          <span className="status">
            <b>Status : </b>Draft
          </span>
          <span className="visibility">
            <b>Visibility : </b>Public
          </span>
          <input
            type="file"
            id="post-image"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="post-image" className="post-image">
            Upload Image
          </label>
          <div className="option-buttons">
            <button className="draft-btn">Draft</button>
            <button className="publish-btn" onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>
        <div className="item post-options">
          <h2 className="category">Select Category</h2>
          <div className="category-options">
            <div className="category-option">
              <input
                type="radio"
                checked={cat === "uiux"}
                name="cat"
                id="uiux"
                value="uiux"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="uiux">UI UX</label>
            </div>
            <div className="category-option">
              <input
                type="radio"
                checked={cat === "reactjs"}
                name="cat"
                id="reactjs"
                value="reactjs"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="reactjs">React JS</label>
            </div>
            <div className="category-option">
              <input
                type="radio"
                checked={cat === "nodejs"}
                name="cat"
                id="nodejs"
                value="nodejs"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="nodejs">Node JS</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
