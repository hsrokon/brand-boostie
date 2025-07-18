import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://brand-boostie-server.vercel.app/paymentClaims?email=${user.email}`)
        .then(res => res.json())
        .then(data => setClaims(data))
        .catch(err => console.error('Failed to fetch claims:', err));
    }
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();

    const displayName = e.target.name.value || user.displayName;
    const photoURL = e.target.photo.value || user.photoURL;

    updateUserProfile(displayName, photoURL)
      .then(() => {
        Swal.fire({
          title: "User Profile Updated!",
          icon: "success",
        });
      })
      .catch(error => {
        console.log('Profile update error from dashboard', error);
      });

    e.target.reset();
  };

  return (
    <div className="min-h-screen w-10/12 max-w-6xl mx-auto grid lg:grid-cols-10 gap-8 my-10">
      {/* Left Side */}
      <div className="lg:col-span-6">
        <div className="mb-6 flex justify-center lg:justify-start">
          <Link to="/" className="text-xl md:text-3xl font-bold hover:text-primary hover:underline">
            &#10095; Home
          </Link>
        </div>

        <h1 className="text-2xl md:text-center lg:text-left lg:text-3xl">
          Hey, <span className="text-primary">{user?.displayName}</span> hope you're doing great!
        </h1>
        <p className="mt-2 text-sm md:text-center lg:text-left lg:text-base">
          &#10095; Email:{" "}
          <span className="font-semibold text-primary">{user?.email}</span>
        </p>

        <div className="w-40 h-40 mx-auto lg:mx-0 md:w-56 md:h-56 mt-6 rounded-full overflow-hidden border-4 border-primary shadow-md">
          <img className="w-full h-full object-cover" src={user?.photoURL} alt="Profile" />
        </div>

        {/* Improved Service Claims Section */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-6 border-b border-base-300 pb-2">
            Your Service Claims
          </h2>

          {claims.length > 0 ? (
            <div className="space-y-6">
              {claims.map((claim) => (
                <div
                  key={claim._id}
                  className="bg-base-100 border-l-4 border-primary p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="md:text-lg">
                    <span className="font-semibold text-gray-700">Service:</span>
                    <span className="ml-2 text-accent font-medium">{claim.service}</span>
                  </p>
                  <p className="md:text-lg">
                    <span className="font-semibold text-gray-700">Plan:</span>
                    <span className="ml-2 text-accent font-medium">{claim.plan}</span>
                  </p>
                  <p className="md:text-lg">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="ml-2 text-primary font-semibold">{claim.status}!</span>
                  </p>
                  <p className="md:text-lg">
                    <span className="font-semibold text-gray-700">Verified:</span>
                    <span
                      className={`ml-2 font-semibold ${
                        claim.isVerified ? "text-secondary" : "text-red-600"
                      }`}
                    >
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
      </div>

      {/* Right Side - Update Form */}
      <div className="lg:col-span-4 mt-8 md:mt-12 lg:mt-0">
        <h2 className="text-2xl mb-4 font-semibold text-primary">
          &#10095; Update Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="card-body p-0 space-y-4">
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              name="name"
              className="input rounded-2xl text-base-content border-2 border-primary w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="text-sm">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input rounded-2xl text-base-content border-2 border-primary w-full"
              placeholder="Profile photo URL"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary text-white border-base-100 rounded-2xl mt-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
