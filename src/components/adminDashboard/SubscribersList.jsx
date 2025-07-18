import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://brand-boostie-server.vercel.app/subscribers")
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch subscribers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">📧 Subscribed Emails</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="hover:bg-base-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{subscriber.email}</td>
                  <td className="p-3">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button 
      onClick={()=>navigate(-1)}
      className="btn my-4 border-2 border-primary bg-primary text-white hover:bg-primary/90">
        Go Back
      </button>
    </div>
  );
};

export default SubscribersList;
