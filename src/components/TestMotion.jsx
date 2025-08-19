import { motion } from "framer-motion";

const TestMotion = () => {
    return (

        //test no apply , 
        <motion.div
            className="w-64 h-32 bg-indigo-500 text-white rounded-lg p-4 mx-auto mt-96"
            initial={{ opacity: 0, y: 50 }} // starts hidden and 50px below
            whileInView={{ opacity: 1, y: 0 }} // snimates in when element enters view
            transition={{ duration: 0.6, ease: 'easeOut' }} // smooth entry transition
            viewport={{ once: true }} // animation only triggers once
        >
            I faded and slide in
        </motion.div>
    );
};

export default TestMotion;
