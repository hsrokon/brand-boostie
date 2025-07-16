import React, { useState } from 'react';
import BlogCard from '../components/blogs/BlogCard';

const Blogs = () => {

    const [ blogs, setBlogs ] = useState([]);

    useState(()=>{
        fetch('http://localhost:5000/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
    },[])

    return (
        <div  className='min-h-screen'>
            <div className='max-w-3xl mx-auto space-y-4 mt-8 text-center'>
                <h1 className='text-3xl lg:text-4xl font-semibold text-primary'>Insights & Trends</h1>
                <p className='font-semibold'>Stay updated with the latest marketing ideas, tips, and stories.</p>
            </div>

            <section className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </section>

        </div>
    );
};

export default Blogs;