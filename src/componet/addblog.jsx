


import React, { useState } from "react";

function Addblog() {
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/blog/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...blog,
        userId: localStorage.getItem("userId"), 
      }),
     
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert(data.msg);
        console.log("Blog added:", data.blog);

        setBlog({
          title: "",
          image: "",
          description: ""

        })
      })
      .catch((error) => console.error("Error adding blog:", error));
  };

  return (
    <div className="container2">
      <h2 className="hh">Add a New Blog</h2>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          className="in2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={blog.image}
          onChange={handleChange}
           className="in2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={blog.description}
          onChange={handleChange}
           className="te1"
        />
        <button className="btn2" type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default Addblog;
