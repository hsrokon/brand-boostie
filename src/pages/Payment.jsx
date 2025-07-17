import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BsCopy } from "react-icons/bs";

const Payment = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const service = params.get("service");
  const planFromURL = params.get("plan") || "Starter";

  const { user } = useContext(AuthContext);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(planFromURL);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/pricing.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.service === service);
        setSelectedService(found);
      });
  }, [service]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getPlanPrice = () => {
    if (!selectedService) return 0;
    return selectedPlan === "Professional"
      ? selectedService.professionalPrice
      : selectedService.starterPrice;
  };

  if (!selectedService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">
          Complete Your Purchase
        </h1>

        <p className="text-lg text-center mb-6 text-gray-700">
          You're purchasing the{" "}
          <span className="font-semibold text-accent">
            {selectedService.service}
          </span>{" "}
          service.
        </p>

        <form className="space-y-6">
          {/* 🧑‍💼 User Info */}
          <div className="text-center text-secondary">
            <p>
              <span className="text-lg font-semibold">Name :</span>{" "}
              {user.displayName}
            </p>
            <p>
              <span className="text-lg font-semibold">Email :</span>{" "}
              {user.email}
            </p>
          </div>

          {/* 📢 Instructions */}
          <div className="max-w-md mx-auto text-center space-y-1">
            <h4 className="text-center font-semibold text-xl">
              Pay According to Plan
            </h4>
            <p className="text-center">
                You've to <span className="font-semibold">"Send Money"</span> on{" "}
                <button
                    type="button"
                    onClick={() => {
                    navigator.clipboard.writeText("01717506963");
                    alert("Number copied to clipboard!");
                    }}
                    className="font-semibold text-primary underline hover:text-accent cursor-pointer inline-flex items-center gap-1"
                >
                    <BsCopy className="text-base relative -top-[1px]" />
                    01717506963
                </button>{" "}
                and attach the transaction ID. Then submit the form. After review, we'll notify you soon.
                </p>
          </div>

          {/* 📋 Plan Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Plan</label>
            <select
              className="select select-bordered w-full"
              required
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="Starter">Starter Plan</option>
              <option value="Professional">Professional Plan</option>
            </select>
          </div>

          {/* 💳 Payment Method */}
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select className="select select-bordered w-full" required>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
          </div>

          {/* 📱 Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Your Phone No:</label>
            <input
              type="number"
              placeholder="01XXXXXXXXX"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* 🧾 Transaction ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction ID
            </label>
            <input
              type="text"
              placeholder="e.g., TXN12345ABC"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* 💸 Payment Amount Display */}
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">
              Total Payment:{" "}
              <span className="text-primary">৳{getPlanPrice()}</span>
            </h2>
          </div>

          {/* ✅ Submit Buttons */}
          <div className="space-y-2">
            <button type="submit" className="btn btn-primary text-white w-full">
              Claim Purchase
            </button>
            <button
              type="button"
              className="btn btn-primary w-full text-white"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
