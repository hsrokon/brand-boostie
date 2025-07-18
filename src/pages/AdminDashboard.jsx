import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (loading) return;

    const checkAdminRole = async () => {
      if (!user) {
        setIsAuthorized(false);
        return;
      }

      try {
        const res = await fetch(`https://brand-boostie-server.vercel.app/users/${user.email}`);
        const data = await res.json();
        setIsAuthorized(data.role === "admin");
      } catch (err) {
        console.error(err);
        setIsAuthorized(false);
      }
    };

    checkAdminRole();
  }, [user, loading]);

  if (loading || isAuthorized === null) {
    return <p className="text-center mt-10 text-lg font-semibold">Checking admin permissions...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-accent mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl my-6">Welcome, <span className="text-secondary font-semibold">{user?.displayName || user?.email}!</span></h2>

      <div className="grid gap-4">
        <Link to="/admin/dashboard/paymentClaims" className="btn btn-outline btn-primary hover:text-white">Manage Payment Claims</Link>
        <Link to="/admin/dashboard/postBLog" className="btn btn-outline btn-primary hover:text-white">Post Blog</Link>
        <Link to="/admin/dashboard/postCaseStudy" className="btn btn-outline btn-primary hover:text-white">Post Case Study</Link>
        <Link to="/admin/dashboard/managePricing" className="btn btn-outline btn-primary hover:text-white">Manage Pricing</Link>
        <Link to="/admin/dashboard/subscribers" className="btn btn-outline btn-primary hover:text-white">View Subscribers</Link>
      </div>

      <Link to="/" className="btn my-4 border-2 border-primary bg-primary text-white hover:bg-primary/90">
        Go Home
      </Link>
    </div>
  );
};

export default AdminDashboard;
