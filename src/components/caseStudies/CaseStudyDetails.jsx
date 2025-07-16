import { Link, useLoaderData } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { PiListMagnifyingGlassThin } from "react-icons/pi";

const CaseStudyDetails = () => {
  const caseStudy = useLoaderData();
  console.log(caseStudy);

  const {
    title,
    coverImage,
    client,
    category,
    description,
    results,
    author,
    photoURL,
    createdAt,
  } = caseStudy;

  const publishDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-8">

      {/* Cover */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-72 md:h-96 object-cover rounded-lg shadow"
      />

      {/* Meta */}
      <div className="space-y-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full mb-2">
          {category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mb-1">{title}</h1>
        <div className="flex items-center gap-1 mt-4">
          {photoURL && (
            <div className="w-6 h-6 border-2 rounded-full border-secondary">
              <img
                className="w-full h-full object-cover rounded-full"
                src={photoURL}
                alt={author}
              />
            </div>
          )}
          • By{" "}
          <span className="font-medium">{author}</span> on {publishDate}
        </div>

        <p className="font-semibold italic text-gray-500">
          Client: <span className="font-medium">{client}</span>
        </p>
      </div>

      {/* Description */}
      <div className="prose max-w-none prose-p:leading-relaxed prose-headings:mb-4 prose-img:rounded-lg">
        <h2 className="text-xl font-semibold text-primary flex items-center  gap-1"><PiListMagnifyingGlassThin />Overview</h2>
        {description.split('\n').map((line, idx) =>
          line.trim() === ''
            ? <br key={idx} />
            : <p key={idx}>{line}</p>
        )}

        {results && (
          <>
            <h2 className="text-xl font-semibold text-primary">Results / Outcomes:</h2>
            {results.split('\n').map((line, idx) =>
              line.trim() === ''
                ? <br key={idx} />
                : <p key={idx}>{line}</p>
            )}
          </>
        )}
      </div>

      <Link
        to="/caseStudies"
        className="inline-flex items-center gap-1 btn border-primary text-primary hover:bg-primary hover:text-white"
      >
        <MdArrowBack /> Back to Case Studies
      </Link>
    </article>
  );
};

export default CaseStudyDetails;
