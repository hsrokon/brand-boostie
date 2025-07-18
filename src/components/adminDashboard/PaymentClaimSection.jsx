import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PaymentClaimsSection = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://brand-boostie-server.vercel.app/paymentClaims")
      .then((res) => res.json())
      .then((data) => {
        setClaims(data);
        setLoading(false);
      });
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await fetch(
        `https://brand-boostie-server.vercel.app/paymentClaims/${id}/verify`,
        { method: "PATCH" }
      );
      if (res.ok) {
        Swal.fire("Verified!", "The claim has been verified.", "success");
        setClaims((prev) =>
          prev.map((c) => (c._id === id ? { ...c, isVerified: true } : c))
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not verify the claim.", "error");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://brand-boostie-server.vercel.app/paymentClaims/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
        }
      );
      if (res.ok) {
        Swal.fire("Updated!", `Status updated to ${newStatus}.`, "success");
        setClaims((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update status.", "error");
    }
  };

  if (loading) return <p>Loading payment claims...</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Payment Claims</h2>
      {claims.length === 0 ? (
        <p>No claims yet.</p>
      ) : (
        <div className="space-y-6">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <p><strong>Name:</strong> {claim.name}</p>
              <p><strong>Email:</strong> {claim.email}</p>
              <p><strong>Service:</strong> {claim.service}</p>
              <p><strong>Plan:</strong> {claim.plan}</p>
              <p><strong>Payment:</strong> ৳{claim.price} via {claim.paymentMethod}</p>
              <p><strong>Phone:</strong> {claim.phoneNo}</p>
              <p><strong>Txn ID:</strong> {claim.transactionID}</p>
              <p><strong>Status:</strong> <span className="text-primary">{claim.status}</span></p>
              <p><strong>Verified:</strong> {claim.isVerified ? "✅ Yes" : "❌ No"}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {!claim.isVerified && (
                  <button
                    onClick={() => handleVerify(claim._id)}
                    className="btn btn-success btn-sm"
                  >
                    Verify
                  </button>
                )}

                {claim.status === "Received" && (
                  <button
                    onClick={() => handleStatusUpdate(claim._id, "In Progress")}
                    className="btn btn-info btn-sm"
                  >
                    Set In Progress
                  </button>
                )}
                {claim.status === "In Progress" && (
                  <button
                    onClick={() => handleStatusUpdate(claim._id, "Completed")}
                    className="btn btn-accent btn-sm"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PaymentClaimsSection;
