import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import Hero from "../components/hero/Hero";
import "./page-styles/home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search


  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)

      }catch (err){
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

  const Text = (htmlText) => {
    const doc = new DOMParser().parseFromString(htmlText, "text/html")
    return doc.body.textContent
  }

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Post Title 1",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 2,
  //     title: "Post Title 2",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 3,
  //     title: "Post Title 3",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 4,
  //     title: "Post Title 4",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 5,
  //     title: "Post Title 5",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 6,
  //     title: "Post Title 6",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quod dolores labore, quia recusandae reiciendis libero beatae deleniti doloremque consectetur!",
  //     img: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  // ];
  return (
    <div>
      <section className="section ">
        <Hero />
      </section>
      <section className="section grey-bg">
        {/* <h2 className="section-heading heading">Recent Posts</h2> */}
        <div className="posts">
          {posts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="post-box">
                  <Link className="link post-link" to={`/post/${post.id}`}>
                    <div className="img">
                      <img src={`../images/${post.img}`} alt="" />
                    </div>
                    <div className="content">
                      <h1>{post.title}</h1>
                      <hr />
                      <p>{Text(post.desc)}</p>
                      <div className="read-more">Read More</div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
