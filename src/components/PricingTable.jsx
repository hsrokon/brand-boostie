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
    <div className="w-full max-w-6xl mx-auto p-4">
      {pricingData.map((service, index) => (
        <div
          key={index}
          className="grid grid-cols-4 border-b last:border-0"
        >
          {/* Service name with row-span */}
          <div
            className={`row-span-${service.features.length} flex items-center justify-center bg-gray-50 font-bold text-lg border-r`}
          >
            {service.service}
          </div>

          {/* Features rows */}
          <div className="col-span-3">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-3 items-center py-4 px-2 border-b ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div>{feature.name}</div>
                <div className="text-center">
                  {feature.starter ? (
                    <IoMdCheckmark className="text-green-600 inline" />
                  ) : (
                    <RxCross2 className="text-red-500 inline" />
                  )}
                </div>

                {/* Professional column wrapped in a rounded shape */}
                <div
                  className={`text-center ${
                    idx === 0 ? "rounded-t-2xl" : ""
                  } ${idx === service.features.length - 1 ? "rounded-b-2xl" : ""}
                  bg-primary/5 border border-primary`}
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
