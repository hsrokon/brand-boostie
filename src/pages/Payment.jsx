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
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [ isVoucherClaimed, setIsVoucherClaimed ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://brand-boostie-server.vercel.app/pricingPlans")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.service === service);
        setSelectedService(found);
      });
  }, [service]);

  const handleGoBack = () => navigate(-1);

  const getPlanPrice = (discount = 0) => {
    if (!selectedService) return 0;
    const basePrice =
      selectedPlan === "Professional"
        ? selectedService.professionalPrice
        : selectedService.starterPrice;
    return Math.round(basePrice - (basePrice * discount) / 100);
  };

  const validateVoucher = async (code) => {
    if (!code) {
      setVoucherDiscount(0);
      setVoucherDetails(null);
      return false;
    }
    try {
      const res = await fetch("https://brand-boostie-server.vercel.app/validate-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), amount: getPlanPrice() }),
      });
      const data = await res.json();

      if (res.ok && data.valid) {
        setVoucherDiscount(data.discount);
        setVoucherDetails(data);
        setIsVoucherClaimed(true);
        return true;
      } else {
        setVoucherDiscount(0);
        setVoucherDetails(null);
        return false;
      }
    } catch (err) {
      console.error(err);
      setVoucherDiscount(0);
      setVoucherDetails(null);
      return false;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);
    const phoneNo = formData.get("phoneNo");
    const inputVoucherCode = formData.get("voucherCode").trim();

    if (phoneNo.length !== 11) {
      Swal.fire("Invalid Phone No!", "Phone no must be 11 digits!", "error");
      setLoading(false);
      return;
    }

    const isVoucherValid = await validateVoucher(inputVoucherCode);
    if (inputVoucherCode && !isVoucherValid) {
      Swal.fire("Invalid or expired voucher", "", "error");
      setLoading(false);
      return;
    }

    const basePrice = getPlanPrice();
    if (voucherDetails?.minAmount && basePrice < voucherDetails.minAmount) {
      Swal.fire("Voucher Not Applicable", `Minimum amount is ৳${voucherDetails.minAmount}`, "error");
      setLoading(false);
      return;
    }
    if (
      voucherDetails?.maxAmount !== undefined &&
      basePrice > voucherDetails.maxAmount
    ) {
      Swal.fire("Voucher Not Applicable", `Maximum amount is ৳${voucherDetails.maxAmount}`, "error");
      setLoading(false);
      return;
    }

    const claimData = {
      name: user?.displayName || "Anonymous",
      email: user?.email || "No Email",
      service: selectedService.service,
      plan: formData.get("plan"),
      paymentMethod: formData.get("paymentMethod"),
      phoneNo,
      transactionID: formData.get("transactionID"),
      price: getPlanPrice(voucherDiscount),
      voucherCode: inputVoucherCode,
      voucherDiscount,
    };

    try {
      await emailjs.sendForm("service_70x9e51", "template_1doh8cv", form.current, "gW7WrVtHZVykpscjy");

      const res = await fetch("https://brand-boostie-server.vercel.app/paymentClaims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(claimData),
      });
      const result = await res.json();

      if (res.ok && result.insertedId) {
        if (inputVoucherCode && isVoucherValid) {
          await fetch("https://brand-boostie-server.vercel.app/claim-voucher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: inputVoucherCode }),
          });
        }
        Swal.fire("Payment claim successful!", "", "success");
        form.current.reset();
        setVoucherDiscount(0);
        setVoucherDetails(null);
        setVoucherCode("");
      } else {
        throw new Error("Failed to save claim");
      }
    } catch (err) {
      console.error("Payment claim failed", err);
      Swal.fire("Payment claim failed!", "Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">Complete Your Purchase</h1>
        <p className="text-lg text-center mb-6 text-gray-700">
          You're purchasing the <span className="font-semibold text-accent">{selectedService?.service}</span> service.
        </p>

        <form onSubmit={sendEmail} ref={form} className="space-y-6">
          <input type="hidden" name="service" value={selectedService?.service} />
          <input type="hidden" name="name" value={user?.displayName || "Anonymous"} />
          <input type="hidden" name="email" value={user?.email || "No Email"} />

          <div className="text-center text-secondary">
            <p><span className="text-lg font-semibold">Name :</span> {user?.displayName}</p>
            <p><span className="text-lg font-semibold">Email :</span> {user?.email}</p>
          </div>

          <div className="max-w-md mx-auto text-center space-y-1">
            <h4 className="text-center font-semibold text-xl">Pay According to Plan</h4>
            <p>
              You've to <span className="font-semibold">"Send Money"</span> on {' '}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("01717506963");
                  Swal.fire({ title: "Number copied to clipboard!", icon: "success" });
                }}
                className="font-semibold text-primary underline hover:text-accent cursor-pointer inline-flex items-center gap-1"
              >
                <BsCopy className="text-base relative -top-[1px]" /> 01717506963
              </button>
              {' '}and attach the transaction ID.
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

          <div>
            <label className="block text-sm font-medium mb-1">Have a Voucher Code?</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="voucherCode"
                className="input input-bordered flex-1"
                placeholder="e.g., DISCOUNT20"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline btn-accent"
                onClick={async () => {
                  if (isVoucherClaimed) {
                    Swal.fire("No more!", "You can only apply voucher once.", "warning");
                    return;
                  }
                  const isValid = await validateVoucher(voucherCode);
                  if (isValid) {
                    Swal.fire("Voucher Applied!", `You've received a discount.`, "success");
                  } else {
                    Swal.fire("Invalid Voucher", "Please check the code and try again.", "error");
                  }
                }}
              >
                Validate
              </button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md text-center">
            <h2 className="text-lg font-semibold">
              Total Payment: <span className="text-primary">৳{getPlanPrice(voucherDiscount)}</span>
              {voucherDiscount > 0 && (
                <p className="text-green-600 text-sm mt-1">
                  🎉 A discount of {voucherDiscount}% has been applied!
                </p>
              )}
              <input type="hidden" name="planPrice" value={getPlanPrice(voucherDiscount)} />
            </h2>
          </div>

          <div className="space-y-2">
            <button 
            type="submit" 
            className="btn btn-primary text-white w-full" 
            disabled={loading}>
              {loading ? "Claiming..." : "Claim Purchase"}
            </button>

            <button
              type="button"
              className="btn btn-primary w-full text-white"
              onClick={handleGoBack}
              disabled={loading}
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
