import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentClaimsSection = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(true); // toggle state


  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const url = showOnlyIncomplete
        ? "https://brand-boostie-server.vercel.app/paymentClaims?statusNot=Completed"
        : "https://brand-boostie-server.vercel.app/paymentClaims";

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const latestFirst = data.slice().reverse(); // creates a new array in reversed order
            setClaims(latestFirst);
            setLoading(false);
        });
    }, [showOnlyIncomplete]);


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

  const handleDelete = async (id) => {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This claim will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirm.isConfirmed) return;

      try {
        const res = await fetch(`https://brand-boostie-server.vercel.app/paymentClaims/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "The claim has been removed.", "success");
          setClaims((prev) => prev.filter((c) => c._id !== id));
        } else {
          throw new Error("Deletion failed");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Could not delete claim.", "error");
      }
    };


  if (loading) return <p>Loading payment claims...</p>;

  return (
    <section className="w-11/12 mx-auto md:w-9/12 lg:w-8/12 xl:w-6/12 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payment Claims</h2>
        <button
            onClick={() => setShowOnlyIncomplete((prev) => !prev)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
        >
            {showOnlyIncomplete ? "Show All Claims" : "Show Only Incomplete"}
        </button>
      </div>

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
              <p><strong>Voucher Code:</strong> {claim.voucherCode || "—"}</p>
              <p><strong>Discount Applied:</strong> {claim.voucherDiscount ? `${claim.voucherDiscount}%` : "—"}</p>
              <p><strong>Status:</strong> <span className="text-primary">{claim.status}</span></p>
              <p><strong>Verified:</strong> {claim.isVerified ? " Yes" : " No"}</p>

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

                <button
                  onClick={() => handleDelete(claim._id)}
                  className="btn btn-outline btn-error btn-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      <button 
      onClick={()=>navigate(-1)}
      className="btn my-4 border-2 border-primary bg-primary text-white hover:bg-primary/90">
        Go Back
      </button>

    </section>
  );
};

export default PaymentClaimsSection;
