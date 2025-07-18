import { useEffect, useState } from "react";
import CaseStudyCard from "../components/caseStudies/CaseStudyCard";
import Loading from "../components/Loading";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('https://brand-boostie-server.vercel.app/caseStudies')
      .then(res => res.json())
      .then(data => {
        setCaseStudies(data);
        setLoading(false); //  Stop loading when done
      })
      .catch(err => {
        console.error("Failed to load case studies:", err);
        setLoading(false); // Still stop loading on error
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto space-y-4 mt-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-semibold text-primary">Client Stories</h1>
        <p className="font-semibold">Explore how we help clients succeed.</p>
      </div>

      {loading ? (
        <Loading /> // Show spinner
      ) : (
        <section className="w-full xl:w-10/12 mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map(cs => (
            <CaseStudyCard key={cs._id} caseStudy={cs} />
          ))}
        </section>
      )}
    </div>
  );
};

export default CaseStudies;
