import React, { useState } from 'react';
import BlogCard from '../components/blogs/BlogCard';
import Loading from '../components/Loading';

const Blogs = () => {

    const [ blogs, setBlogs ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useState(()=>{
        fetch('https://brand-boostie-server.vercel.app/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
        .then(setLoading(false))
    },[])

    return (
        <div  className='min-h-screen'>
            <div className='max-w-3xl mx-auto space-y-4 mt-8 text-center'>
                <h1 className='text-3xl lg:text-4xl font-semibold text-primary'>Insights & Trends</h1>
                <p className='font-semibold'>Stay updated with the latest marketing ideas, tips, and stories.</p>
            </div>

            {loading ? <Loading></Loading> : <section className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map(blog => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </section>}

        </div>
    );
};

export default Blogs;