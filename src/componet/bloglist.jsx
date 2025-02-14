


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Bloglist = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://blogsbackend-5.onrender.com/blog", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                const data = await response.json();
                setBlogs(data.blogs);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <p className="loading">Loading blogs...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="bloglist-container">
            <h2 className="bloglist-title">All Blogs</h2>
            {blogs.map((blog) => (
                <div className="blog-card" key={blog._id}>
                    <div className="blog-image-container">
                        {blog.image && (
                            <img
                                className="blog-image"
                                src={blog.image}
                                alt={blog.title}
                            />
                        )}
                    </div>
                    <div className="blog-content">
                        <h3 className="blog-title">
                            <Link to={`/singalblog/${blog._id}`}>Title:-{blog.title}</Link>
                        </h3>
                        <p className="blog-description">Description:-{blog.description}</p>
                        {blog.userID ? (
                            <small className="blog-autho">
                                By: {blog.userID.username} ({blog.userID.email})
                            </small>
                        ) : (
                            <small className="blog-autho">By: Unknown Author</small>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Bloglist;

