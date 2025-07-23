import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const Loading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen -mt-20">
      {animationData && (
        <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: 200, height: 200 }} />
      )}
    </div>
  );
};

export default Loading;
