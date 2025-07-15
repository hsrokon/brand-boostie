import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, title, coverImage, category, content, author, createdAt } = blog;

  // Format publish date nicely
  const publishDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Short preview for content
  const preview = content.length > 150 ? `${content.slice(0, 150)}...` : content;

  return (
    <div className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition">
      <figure>
        <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <span className="badge italic text-primary mb-2">{category}</span>
        <h2 className="card-title text-xl font-bold">{title}</h2>
        <p className="text-sm text-base-content">{preview}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>By {author}</span>
          <span>{publishDate}</span>
        </div>

        <div className="mt-4">
          <Link
            to={`/blogs/${_id}`}
            className="text-primary font-semibold underline hover:text-primary/80"
          >
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;