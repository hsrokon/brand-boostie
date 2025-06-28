import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const PricingTable = () => {
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => setPricingData(data));
  }, []);

  return (
    <div className="w-full mx-auto md:px-4 z-10">
      {pricingData.map((service, index) => (
        <div
          key={index}
          className="grid grid-cols-4 last:border-0"
        >
          {/* Service name with row-span */}
          <div
            className={`row-span-${service.features.length} flex items-center justify-center font-bold text-sm pl-1.5 md:pl-0 md:text-lg bg-gradient-to-b from-transparent via-secondary/15 border border-r-0 border-gray-400 rounded-l-xl to-transparent`}
          >
            {service.service}
          </div>

          {/* Features rows */}
          <div className="col-span-3">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                // 
                className={`grid grid-cols-3 items-center border-b border-gray-200 py-4 pl-6 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="text-sm lg:text-base">{feature.name}</div>
                <div className="text-center">
                  {feature.starter ? (
                    <IoMdCheckmark className="text-green-600 inline" />
                  ) : (
                    <RxCross2 className="text-red-500 inline" />
                  )}
                </div>

                {/* Professional column wrapped in a rounded shape */}
                <div
                  className={`text-center`}
                >
                  {feature.professional ? (
                    <IoMdCheckmark className="text-green-600 inline" />
                  ) : (
                    <RxCross2 className="text-red-500 inline" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
