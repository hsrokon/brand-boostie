import { Link } from "react-router-dom";

const CaseStudyCard = ({ caseStudy }) => {
  const {
    _id,
    coverImage,
    title,
    client,
    category,
    photoURL,
    description,
    author,
    createdAt,
  } = caseStudy;

  const publishDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={coverImage}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full mb-2 w-fit">
          {category}
        </span>

        <h2 className="text-xl font-semibold mb-1">{title}</h2>

        <p className="text-sm text-gray-500 mb-2">Client: <span className="font-medium">{client}</span></p>

        <p className="text-gray-600 flex-grow">
          {description.slice(0, 100)}...
        </p>

        <div className="flex items-center gap-2 my-4">
            <div>
                {
                    photoURL && <div className="h-5 w-5 mt-2">
                    <img className="h-full w-full object-cover rounded-full" src={photoURL} alt="" />
                    </div>
                }
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
                By {author} • {publishDate}
            </p>
          </div> 

        <Link
          to={`/caseStudies/${_id}`}
          className="mt-4 py-1 inline-block btn btn-sm bg-primary text-white hover:bg-primary/90"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default CaseStudyCard;
