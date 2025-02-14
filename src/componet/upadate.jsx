


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', description: '', image: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://blogsbackend-5.onrender.com/blog/blog/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch blog data');
                }
    
                const data = await response.json();
                setBlog(data.blog);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBlog();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        fetch(`https://blogsbackend-5.onrender.com/blog/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(blog),
        })
        .then((res) =>res.json()) 
        .then((data) => {
            console.log('Update response:', data);

            if(data.msg)
            {
                alert("Blog updated successfully")
            }
            else if(data.error)
            {
                alert("Failed to update the blog")
            }
           
            navigate('/getmain');
        })
        .catch((error) => {
            console.error('Error updating blog:', error);
            alert('An error occurred while updating the blog');
        });
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="update-container">
            <h2>Edit Blog</h2>
            <form className="update-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={blog.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={blog.image}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default Update;
