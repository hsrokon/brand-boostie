import { Link, useLoaderData } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const CaseStudyDetails = () => {
  const caseStudy = useLoaderData();
  console.log(caseStudy);
  

//   if (!caseStudy) {
//     return <Loading/>;
//   }

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

      <img
        src={coverImage}
        alt={title}
        className="w-full h-72 md:h-96 object-cover rounded-lg shadow"
      />

      <div className="space-y-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full mb-2">
          {category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mb-1">{title}</h1>
        <div className="flex items-center gap-1 mt-4">
            {
                photoURL && <div className="w-6 h-6 border-2 rounded-full border-secondary">
                    <img className="w-full h-full object-cover rounded-full" src={photoURL} alt="" />
                </div>
            }
            • By{" "}
          <span className="font-medium">{author}</span> on {publishDate}
        </div>

        <p className="text-sm text-gray-500">
          Client: <span className="font-medium">{client}</span>
        </p>
        
      </div>

      <div className="prose prose-p:leading-relaxed prose-headings:mb-4 prose-img:rounded-lg max-w-none">
        <h2>Overview</h2>
        <p>{description}</p>

        {results && (
          <>
            <h2>Results / Outcomes</h2>
            <p>{results}</p>
          </>
        )}
      </div>

      {/* Back Button */}
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
