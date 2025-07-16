import { useState } from "react";
import CaseStudyCard from "../components/caseStudies/CaseStudyCard";

const CaseStudies = () => {

    const [ caseStudies, setCaseStudies ] = useState([]);

    useState(()=>{
            fetch('https://brand-boostie-server.vercel.app/caseStudies')
            .then(res => res.json())
            .then(data => setCaseStudies(data))
        },[])

  return (
    <div  className='min-h-screen'>

        <div className='max-w-3xl mx-auto space-y-4 mt-8 text-center'>
                <h1 className='text-3xl lg:text-4xl font-semibold text-primary'>Client Stories</h1>
                <p className='font-semibold'>Explore how we help clients succeed.</p>
        </div>

        <section className="w-full xl:w-10/12 mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map(cs => (
            <CaseStudyCard key={cs._id} caseStudy={cs} />
        ))}
        </section>
    </div>
  );
};


export default CaseStudies;