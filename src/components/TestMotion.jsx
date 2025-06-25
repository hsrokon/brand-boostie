import { motion } from "framer-motion";

const TestMotion = () => {
    return (

        // ================================
        // 💡 Example 1: Left to Right on Hover
        // ================================
        // <motion.div
        //     className="w-32 h-32 bg-blue-500 rounded"
        //     whileHover={{ x: 100 }} // Moves 100px to the right on hover
        //     transition={{ type: 'tween', stiffness: 100 }} // Smooth motion
        // >
        //     Hover Me
        // </motion.div>

        // ================================
        // 💡 Example 2: Bounce Effect on Click
        // ================================
        // <motion.div
        //     className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center text-center text-white cursor-pointer"
        //     whileTap={{ scale: 0.8 }} // Shrinks down slightly on click
        //     transition={{ type: 'spring', stiffness: 400, damping: 10 }} // Bouncy feedback
        // >
        //     Click me
        // </motion.div>

        // ================================
        // 💡 Example 3: Scroll-triggered Fade + Slide
        // ================================
        <motion.div
            className="w-64 h-32 bg-indigo-500 text-white rounded-lg p-4 mx-auto mt-96"
            initial={{ opacity: 0, y: 50 }} // Starts hidden and 50px below
            whileInView={{ opacity: 1, y: 0 }} // Animates in when element enters view
            transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth entry transition
            viewport={{ once: true }} // Animation only triggers once
        >
            I faded and slide in
        </motion.div>
    );
};

export default TestMotion;
