import { useState } from "react";
import CaseStudyCard from "../components/caseStudies/CaseStudyCard";

const CaseStudies = () => {

    const [ caseStudies, setCaseStudies ] = useState([]);

    useState(()=>{
            fetch('http://localhost:5000/caseStudies')
            .then(res => res.json())
            .then(data => setCaseStudies(data))
        },[])

  return (
    <div  className='min-h-screen'>
        <section className="w-full xl:w-10/12 mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map(cs => (
            <CaseStudyCard key={cs._id} caseStudy={cs} />
        ))}
        </section>
    </div>
  );
};


export default CaseStudies;