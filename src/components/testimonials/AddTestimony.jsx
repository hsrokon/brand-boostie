import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const AddTestimony = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false); // loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newTestimony = {
      name: user.displayName,
      photo: user.photoURL,
      message,
      role,
      email: user.email // <== REQUIRED to validate on server
    };


    try {
      const res = await fetch("https://brand-boostie-server.vercel.app/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimony),
      });

      if (res.status === 403) {
        throw new Error("FORBIDDEN");
      }
      if (!res.ok) {
        throw new Error("Submission failed");
      }


      Swal.fire("Success", "Your testimony has been submitted!", "success");
      setMessage("");
      setRole("");
    } catch (err) {
      console.error(err);

      if (err.message === "FORBIDDEN") {
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: `You can only submit a testimony after using our service. Please "complete" a service first.`,
        });
      } else {
        Swal.fire("Error", "Something went wrong. Please try again later.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-2 text-primary text-center">Add Your Testimony</h2>
      <p className="text-yellow-600 text-center mb-6 font-medium">
        ⚠️ Only verified clients who have completed a service can leave a testimony.
        <br />
        If you haven't completed a service yet, this form will not accept your submission.
      </p>


      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          placeholder="Your comment..."
          className="textarea textarea-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          required
          placeholder="Your role (e.g., Founder, CEO)"
          className="input input-bordered w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Testimony"}
        </button>

        <button
          type="button"
          className="btn btn-primary w-full text-white"
          onClick={()=>navigate(-1)}
        >
          <IoMdArrowBack /> Go Back
        </button>
      </form>
    </div>
  );
};

export default AddTestimony;
