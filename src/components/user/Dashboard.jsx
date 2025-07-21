import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://brand-boostie-server.vercel.app/paymentClaims?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setClaims(data);
        console.log("Claims fetched:", data);

        const hasCompleted = data.some(
          c => c.status?.toLowerCase() === "completed" && c.isVerified
        );

        if (hasCompleted) {
          fetch("https://brand-boostie-server.vercel.app/vouchers")
            .then(res => res.json())
            .then(voucherData => {
              console.log("Vouchers fetched:", voucherData);
              setVouchers(voucherData);
            })
            .catch(err => console.error("Failed to fetch vouchers:", err));
        }
      })
      .catch(err => console.error("Failed to fetch claims:", err));
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value || user.displayName;
    const photoURL = e.target.photo.value || user.photoURL;

    updateUserProfile(displayName, photoURL)
      .then(() => Swal.fire("User Profile Updated!", "", "success"))
      .catch(err => console.error("Profile update error", err));

    e.target.reset();
  };

  return (
    <div className="min-h-screen w-10/12 max-w-6xl mx-auto grid lg:grid-cols-10 gap-8 my-10">
      {/* LEFT SIDE */}
      <div className="lg:col-span-6">
        <div className="mb-6 flex justify-center lg:justify-start">
          <Link to="/" className="text-xl md:text-3xl font-bold hover:text-primary hover:underline">
            &#10095; Home
          </Link>
        </div>

        <h1 className="text-2xl md:text-center lg:text-left lg:text-3xl">
          Hey, <span className="text-primary">{user?.displayName}</span>!
        </h1>
        <p className="mt-2 text-sm md:text-center lg:text-left lg:text-base">
          &#10095; Email: <span className="font-semibold text-primary">{user?.email}</span>
        </p>

        <div className="w-40 h-40 mx-auto lg:mx-0 md:w-56 md:h-56 mt-6 rounded-full overflow-hidden border-4 border-primary shadow-md">
          <img className="w-full h-full object-cover" src={user?.photoURL} alt="Profile" />
        </div>

        {/* SERVICE CLAIMS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-accent mb-4">Your Service Claims</h2>
          {claims.length > 0 ? (
            <div className="space-y-6">
              {claims.map(claim => (
                <div key={claim._id} className="bg-base-100 border-l-4 border-primary p-4 rounded-xl shadow-md">
                  <p><strong>Service:</strong> {claim.service}</p>
                  <p><strong>Plan:</strong> {claim.plan}</p>
                  <p><strong>Status:</strong> <span className="text-primary">{claim.status}</span></p>
                  <p>
                    <strong>Verified:</strong>{" "}
                    <span className={claim.isVerified ? "text-green-600" : "text-red-600"}>
                      {claim.isVerified ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No service claims found.</p>
          )}
        </div>

        {/* VOUCHERS */}
        {vouchers.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-accent mb-4">Available Vouchers 🎁</h2>
            <div className="space-y-4">
              {vouchers.map(v => (
                <div
                  key={v._id}
                  className="p-4 bg-base-200 rounded-xl border-l-4 border-primary shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <p><strong>Code:</strong> {v.code}</p>
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => {
                        navigator.clipboard.writeText(v.code);
                        Swal.fire("Copied!", `Voucher code "${v.code}" copied to clipboard.`, "success");
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <p><strong>Discount:</strong> {v.discountPercentage}%</p>
                  {(v.usageLimit && v.usedCount >= 0) && (
                    <p><strong>Uses Left:</strong> {v.usageLimit - v.usedCount}</p>
                  )}
                  {/* {v.minAmount && <p><strong>Min:</strong> ৳{v.minAmount}</p>} */}
                  {/* {v.maxAmount && <p><strong>Max:</strong> ৳{v.maxAmount}</p>} */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - PROFILE FORM */}
      <div className="lg:col-span-4 mt-8 md:mt-12 lg:mt-0">
        <h2 className="text-2xl mb-4 font-semibold text-primary">&#10095; Update Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              name="name"
              className="input border-2 border-primary rounded-2xl w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="text-sm">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input border-2 border-primary rounded-2xl w-full"
              placeholder="Profile Photo URL"
            />
          </div>
          <button type="submit" className="btn btn-primary text-white rounded-2xl mt-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
