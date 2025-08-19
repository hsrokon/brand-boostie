import React, { useState, useEffect } from 'react';
import BlogCard from '../components/blogs/BlogCard';
import Loading from '../components/Loading';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://brand-boostie-server.vercel.app/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false); //only stop loading after data is set
      })
      .catch(err => {
        console.error("Failed to load blogs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='max-w-3xl mx-auto space-y-4 mt-8 text-center'>
        <h1 className='text-3xl lg:text-4xl font-semibold text-primary'>Insights & Trends</h1>
        <p className='font-semibold'>Stay updated with the latest marketing ideas, tips, and stories.</p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        blogs.length === 0 ? 
        <div className="flex justify-center items-center min-h-screen">
          <h3 className="text-2xl -mt-20 text-gray-400">No Blogs Available!</h3>
        </div> :
        <section className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Blogs;
