import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const CaseStudiesPost = () => {
  const { user } = useContext(AuthContext);

  const [caseStudy, setCaseStudy] = useState({
    title: "",
    client: "",
    coverImage: "",
    category: "",
    description: "",
    results: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://brand-boostie-server.vercel.app/users/${user.email}`);
      const userData = await res.json();

      if (!userData || userData.role !== "admin") {
        setError("You are not authorized to post a case study.");
        setLoading(false);
        return;
      }

      const newCaseStudy = {
        ...caseStudy,
        email: user.email,
        photoURL : user.photoURL,
        author: user.displayName || user.email,
      };

      const postRes = await fetch("https://brand-boostie-server.vercel.app/caseStudies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCaseStudy),
      });

      if (!postRes.ok) {
        throw new Error("Failed to post case study");
      }

      alert("✅ Case Study posted successfully!");
      setCaseStudy({
        title: "",
        client: "",
        coverImage: "",
        category: "",
        description: "",
        results: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Post a Case Study</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={caseStudy.title}
            onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Enter case study title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Client Name</label>
          <input
            type="text"
            value={caseStudy.client}
            onChange={(e) => setCaseStudy({ ...caseStudy, client: e.target.value })}
            className="input input-bordered w-full"
            placeholder="e.g., ABC Corp"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cover Image URL</label>
          <input
            type="url"
            value={caseStudy.coverImage}
            onChange={(e) => setCaseStudy({ ...caseStudy, coverImage: e.target.value })}
            className="input input-bordered w-full"
            placeholder="https://your-image-link.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={caseStudy.category}
            onChange={(e) => setCaseStudy({ ...caseStudy, category: e.target.value })}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            <option value="Marketing">Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Website">Website</option>
            <option value="Email Marketing">Email Marketing</option>
            <option value="Custom Service">Custom Service</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={caseStudy.description}
            onChange={(e) => setCaseStudy({ ...caseStudy, description: e.target.value })}
            className="textarea textarea-bordered w-full min-h-[150px]"
            placeholder="Write your case study description here..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Results / Outcomes</label>
          <textarea
            value={caseStudy.results}
            onChange={(e) => setCaseStudy({ ...caseStudy, results: e.target.value })}
            className="textarea textarea-bordered w-full min-h-[100px]"
            placeholder="What were the results? (optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-primary text-white border-0 hover:bg-primary/90"
        >
          {loading ? "Posting..." : "Post Case Study"}
        </button>
      </form>

      <Link to="/" className="btn my-4 border-2 border-primary text-primary hover:bg-primary hover:text-white">
        Go Home
      </Link>
    </div>
  );
};

export default CaseStudiesPost;
