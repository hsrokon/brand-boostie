import { MdArrowBack } from "react-icons/md";
import { useLoaderData, Link } from "react-router-dom";
import ConnectSection from "../ConnectSection";

const BlogDetails = () => {
  const blog = useLoaderData(); // ✅ Use loader data directly

  if (!blog) {
    return <p className="text-center py-20">Loading...</p>;
  }

  const { title, coverImage, category, author, photoURL, createdAt, content } = blog;

  const publishDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      {/* Cover Image */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-72 md:h-96 object-cover rounded-lg shadow"
      />

      {/* Meta Info */}
      <div className="space-y-2">
        <span className="inline-block badge text-primary italic">{category}</span>
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        <div className="text-gray-500 flex items-center gap-1.5 my-6">
          {photoURL && (
            <div className="w-6 h-6 border-2 rounded-full border-secondary">
              <img
                className="w-full h-full object-cover rounded-full"
                src={photoURL}
                alt={author}
              />
            </div>
          )}
          By <span className="font-semibold">{author}</span> on {publishDate}
        </div>
      </div>

      {/* Content with preserved line breaks */}
      <div className="prose max-w-none prose-p:leading-relaxed prose-headings:mb-4 prose-img:rounded-lg">
        {content.split("\n").map((line, idx) =>
          line.trim() === "" ? (
            <br key={idx} />
          ) : (
            <p key={idx}>{line}</p>
          )
        )}
      </div>


      {/* Back Button */}
      <Link
        to="/blogs"
        className="mt-6 btn py-1 border-primary text-primary hover:bg-primary hover:text-white inline-flex items-center gap-1"
        >
        <MdArrowBack /> Back to Blogs
      </Link>
        <ConnectSection></ConnectSection>
    </article>
  );
};

export default BlogDetails;
