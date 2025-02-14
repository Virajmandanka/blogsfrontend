import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Getmain = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem('token');

    const navigate=useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://blogsbackend-5.onrender.com/blog/getMine', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const handaldelete=async(blogId)=>{

       await fetch(`https://blogsbackend-5.onrender.com/blog/delete/${blogId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
                }      
        })

        .then((res)=>res.json())
        .then((res)=>{

           

        if(res.msg){
            alert("Blog deleted successfully")
           
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        } else if(res.error)
        {
            alert("Failed to delete blog")
        }

        })

    }

   

    const handleEdit = (blogId) => {
       
        navigate(`/upadate/${blogId}`);
    };

    return (
        <div>
             <h1 className='hhh'>My Blogs</h1>
        <div >
           
            {blogs.length > 0 ? (
                <ul className='container3 shadow '>
                    {blogs.map((blog) => (
                        <li className='li  ' key={blog._id}>
                            
                           
                            <img className='img5' src={blog.image} alt="Blog" style={{ maxWidth: '369px' }} />
                            <h2 className='hhhh'>{blog.title}</h2>
                            <p className='p4'>description:-{blog.description}</p>
                            <div className='de'>
                            <button className='btn4'  onClick={()=>handaldelete(blog._id)}>Delete</button>
                            <p className='p5'><strong>Author:</strong> {blog.userID.username}</p>
                            <button className='btn4' onClick={() => handleEdit(blog._id)}>Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
        </div>
    );
};

export default Getmain;
