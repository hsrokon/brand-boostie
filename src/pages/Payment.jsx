// ✅ Modified Payment.jsx to send data to your server in addition to emailjs

import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BsCopy } from "react-icons/bs";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const Payment = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const service = params.get("service");
  const planFromURL = params.get("plan") || "Starter";

  const [loading, setLoading] = useState(false);
  const form = useRef();

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

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);

    const claimData = {
      name: user?.displayName || "Anonymous",
      email: user?.email || "No Email",
      service: selectedService.service,
      plan: formData.get("plan"),
      paymentMethod: formData.get("paymentMethod"),
      phoneNo: formData.get("phoneNo"),
      transactionID: formData.get("transactionID"),
      price: getPlanPrice(),
    };

    try {
      // Send to EmailJS (this can fail silently if server fails later)
      await emailjs.sendForm(
        "service_70x9e51",
        "template_1doh8cv",
        form.current,
        "gW7WrVtHZVykpscjy"
      );

      // Send to server
      const res = await fetch("https://brand-boostie-server.vercel.app/paymentClaims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimData),
      });

      const result = await res.json();

      if (res.ok && result.insertedId) {
        Swal.fire({
          title: "Payment claim successful!",
          icon: "success",
        });
        form.current.reset();
      } else {
        throw new Error("Server rejected payment claim.");
      }

    } catch (error) {
      console.error("Claim Error:", error);
      Swal.fire({
        title: "Payment claim failed!",
        text: "Please try again or contact support.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">
          Complete Your Purchase
        </h1>

        <p className="text-lg text-center mb-6 text-gray-700">
          You're purchasing the <span className="font-semibold text-accent">{selectedService.service}</span> service.
        </p>

        <form onSubmit={sendEmail} ref={form} className="space-y-6">
          <input type="hidden" name="service" value={selectedService.service} />
          <input type="hidden" name="name" value={user?.displayName || "Anonymous"} />
          <input type="hidden" name="email" value={user?.email || "No Email"} />

          <div className="text-center text-secondary">
            <p><span className="text-lg font-semibold">Name :</span> {user.displayName}</p>
            <p><span className="text-lg font-semibold">Email :</span> {user.email}</p>
          </div>

          <div className="max-w-md mx-auto text-center space-y-1">
            <h4 className="text-center font-semibold text-xl">Pay According to Plan</h4>
            <p className="text-center">
              You've to <span className="font-semibold">"Send Money"</span> on
              <button type="button" onClick={() => {
                navigator.clipboard.writeText("01717506963");
                Swal.fire({ title: "Number copied to clipboard!", icon: "success" });
              }} className="font-semibold text-primary underline hover:text-accent cursor-pointer inline-flex items-center gap-1">
                <BsCopy className="text-base relative -top-[1px]" />
                01717506963
              </button> and attach the transaction ID in the form.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Plan</label>
            <select
              className="select select-bordered w-full"
              required
              name="plan"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="Starter">Starter Plan</option>
              <option value="Professional">Professional Plan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select className="select select-bordered w-full" required name="paymentMethod">
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Phone No:</label>
            <input type="number" name="phoneNo" placeholder="01XXXXXXXXX" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Transaction ID</label>
            <input type="text" name="transactionID" placeholder="e.g., TXN12345ABC" className="input input-bordered w-full" required />
          </div>

          <div className="bg-gray-100 p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">
              Total Payment: <span className="text-primary">৳{getPlanPrice()}</span>
              <input type="hidden" name="planPrice" value={getPlanPrice()} />
            </h2>
          </div>

          <div className="space-y-2">
            <button type="submit" className="btn btn-primary text-white w-full">
              {loading ? "Claiming..." : "Claim Purchase"}
            </button>
            <button type="button" className="btn btn-primary w-full text-white" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
