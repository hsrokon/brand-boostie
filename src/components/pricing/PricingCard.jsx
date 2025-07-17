import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const PricingCard = ({ service, features, starterPrice, professionalPrice }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-base-300 p-6 flex flex-col justify-between h-full">
      {/* Service title */}
      <h2 className="text-xl font-bold text-primary border-b border-primary pb-3 mb-4 text-center">
        {service}
      </h2>

      {/* Plan headings */}
      <div className="grid grid-cols-3 font-semibold text-center text-base-content text-sm sm:text-base mb-4">
        <div></div>
        <div className="text-primary md:text-xl">Starter</div>
        <div className="text-secondary md:text-xl">Professional</div>
      </div>

      {/* Feature list */}
      <div className="flex-1 space-y-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className="grid grid-cols-3 gap-2 text-sm sm:text-base items-start sm:items-center"
          >
            <div className="font-medium text-base-content">{feature.name}</div>

            <div className="text-center sm:border-l sm:pl-2">
              {typeof feature.starter === "boolean" ? (
                feature.starter ? (
                  <IoMdCheckmark className="text-green-600 inline" />
                ) : (
                  <RxCross2 className="text-red-500 inline" />
                )
              ) : (
                <span className="text-xs text-gray-600">{feature.starter}</span>
              )}
            </div>

            <div className="text-center sm:border-l sm:pl-2">
              {typeof feature.professional === "boolean" ? (
                feature.professional ? (
                  <IoMdCheckmark className="text-green-600 inline" />
                ) : (
                  <RxCross2 className="text-red-500 inline" />
                )
              ) : (
                <span className="text-xs text-gray-600">{feature.professional}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Buy buttons */}
      <div className="pt-6 flex flex-col gap-3">

        <Link
          to={`/payment?service=${encodeURIComponent(service)}&plan=Starter`}
          className="btn btn-secondary text-white"
        >
          Buy Starter ৳{starterPrice}
        </Link>

        <Link
          to={`/payment?service=${encodeURIComponent(service)}&plan=Professional`}
          className="btn btn-accent text-white"
        >
          Buy Professional ৳{professionalPrice}
        </Link>

        
      </div>
    </div>
  );
};

export default PricingCard;
