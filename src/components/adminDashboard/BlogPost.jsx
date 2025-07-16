import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    coverImage: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const checkRes = await fetch(`https://brand-boostie-server.vercel.app/users/${user.email}`);
      const userData = await checkRes.json();

      if (!userData || userData.role !== "admin") {
        setError("You are not authorized to post a blog.");
        setLoading(false);
        return;
      }

      const newBlog = {
        ...blog,
        email: user.email,
        author: user.displayName || user.email,
        photoURL: user.photoURL,
      };

      const res = await fetch("https://brand-boostie-server.vercel.app/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) {
        throw new Error("Failed to post blog");
      }

      alert("✅ Blog posted successfully!");
      setBlog({ title: "", content: "", coverImage: "", category: "" });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-primary font-bold">Post a Blog</h2>

      <p>Welcome, {user?.displayName || user?.email}</p>

      {error && <p className="text-red-600">{error}</p>}

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
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            <option value="Marketing">Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Website">Website</option>
            <option value="Email Marketing">Email Marketing</option>
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
          disabled={loading}
          className="btn bg-primary text-white border-0 hover:bg-primary/90"
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>

      <Link to="/" className="btn my-4 border border-primary text-primary hover:bg-primary hover:text-white">
        Go Home
      </Link>
    </div>
  );
};

export default BlogPost;
