import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.scss";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)

      }catch (err){
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

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
    <div className="menu">
      <h2>Other Posts you may like</h2>
      {posts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <Link to={`/`} className="link">
              <img src={`../images/${post.img}`} alt="cover" />
              <h3 className="title">{post.title}</h3>
              <div className="read-more">Read More</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
