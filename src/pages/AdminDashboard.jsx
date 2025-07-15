import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    coverImage: "",
    category: "",
  });

  if (!user) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading... Please log in.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: blog.title,
      content: blog.content,
      coverImage: blog.coverImage,
      category: blog.category,
      email: user.email,
      author: user.displayName || user.email,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBlog),
    });

    if (res.ok) {
      alert("Blog posted successfully!");
      setBlog({ title: "", content: "", coverImage: "", category: "" });
    } else {
      alert("Failed to post blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Admin Dashboard
      </h1>
      <p className="mb-6">Welcome, {user.displayName || user.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Blog Title</label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cover Image URL</label>
          <input
            type="url"
            value={blog.coverImage}
            onChange={(e) => setBlog({ ...blog, coverImage: e.target.value })}
            className="input input-bordered w-full"
            placeholder="https://your-image-link.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
            className="select select-bordered w-full mt-2"
            required
          >
            <option value="">Select category</option>
            <option value="Marketing">Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="textarea textarea-bordered w-full min-h-[150px]"
            placeholder="Write your blog content here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn bg-primary text-white border-0 hover:bg-primary/90"
        >
          Post Blog
        </button>
      </form>
    
        <Link to={'/'}>
            <button
            type="button"
            className="btn my-4 border-2 border-primary text-primary  hover:bg-primary/90 hover:text-white"
            >
                Go Home
            </button>
        </Link>
    </div>
  );
};

export default AdminDashboard;
