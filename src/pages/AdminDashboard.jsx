import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import BlogPost from "../components/adminDashboard/BlogPost";
import CaseStudiesPost from "../components/adminDashboard/CaseStudiesPost";

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(null); // null: still checking

  useEffect(() => {
    // Wait for Auth to finish
    if (loading) return;

    const checkAdminRole = async () => {
      if (!user) {
        setIsAuthorized(false);
        return;
      }

      try {
        const res = await fetch(`https://brand-boostie-server.vercel.app/users/${user.email}`);
        if (!res.ok) {
          console.error("User not found in DB");
          setIsAuthorized(false);
          return;
        }

        const data = await res.json();
        console.log("DB user check:", data);

        if (data.role === "admin") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        setIsAuthorized(false);
      }
    };

    checkAdminRole();
  }, [user, loading]);

  // Wait for Firebase Auth to finish
  if (loading || isAuthorized === null) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Checking admin permissions...
      </p>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-accent mb-4">
        Admin Dashboard
      </h1>

      <section>
        <BlogPost />
      </section>

    <hr />

      <section>
        <CaseStudiesPost />
      </section>
    </div>
  );
};

export default AdminDashboard;
