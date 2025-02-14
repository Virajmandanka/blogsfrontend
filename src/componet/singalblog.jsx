

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Singalblog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`https://blogsbackend-5.onrender.com/blog/singal/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch the blog");
                }

                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p>Loading blog...</p>;
    if (error) return <p>Error: {error}</p>;

    return blog ? (
        <div>
            <h2>{blog.title}</h2>
            {blog.image && <img src={blog.image} alt={blog.title} width="200" />}
            <p>{blog.description}</p>
             {blog.userID ? (
                        <small>By: {blog.userID.username} ({blog.userID.email})</small>
                    ) : (
                        <small>By: Unknown Author</small>
                    )}
        </div>
    ) : (
        <p>Blog not found</p>
    );
};

export default Singalblog;
