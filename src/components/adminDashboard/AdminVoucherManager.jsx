import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminVoucherManager = ({ adminEmail }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discountPercentage: "",
    usageLimit: "",
    email: adminEmail || "",
  });

  const navigate = useNavigate();

  // Track editable voucher values per voucher _id
  const [editValues, setEditValues] = useState({});

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://brand-boostie-server.vercel.app/vouchers");
      const data = await res.json();
      setVouchers(data);

      // Initialize editValues state from fetched vouchers
      const initialEditValues = {};
      data.forEach((v) => {
        initialEditValues[v._id] = {
          code: v.code,
          discountPercentage: v.discountPercentage,
          usageLimit: v.usageLimit,
        };
      });
      setEditValues(initialEditValues);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load vouchers", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleInputChange = (e) => {
    setNewVoucher({ ...newVoucher, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (id, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleAddVoucher = async (e) => {
    e.preventDefault();

    const { code, discountPercentage, usageLimit } = newVoucher;
    if (!code || !discountPercentage || !usageLimit) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    const discount = Number(discountPercentage);
    const count = Number(usageLimit);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      Swal.fire("Error", "Discount must be between 0 and 100", "error");
      return;
    }
    if (isNaN(count) || count < 1) {
      Swal.fire("Error", "Usage count must be at least 1", "error");
      return;
    }

    try {
      const res = await fetch("https://brand-boostie-server.vercel.app/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newVoucher,
          discountPercentage: discount,
          usageLimit: count,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add voucher");
      }

      Swal.fire("Success", "Voucher added", "success");
      setNewVoucher({ code: "", discountPercentage: "", usageLimit: "", email: adminEmail || "" });
      fetchVouchers();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDeleteVoucher = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete voucher?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://brand-boostie-server.vercel.app/vouchers/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Failed to delete voucher");
        }
        Swal.fire("Deleted!", "Voucher deleted", "success");
        fetchVouchers();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleUpdateVoucher = async (id) => {
    const { code, discountPercentage, usageLimit } = editValues[id];

    // Validation
    if (!code.trim()) {
      Swal.fire("Error", "Code cannot be empty", "error");
      return;
    }

    const discountNum = Number(discountPercentage);
    if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
      Swal.fire("Error", "Discount must be between 0 and 100", "error");
      return;
    }

    const usageNum = Number(usageLimit);
    if (isNaN(usageNum) || usageNum < 1) {
      Swal.fire("Error", "Usage limit must be at least 1", "error");
      return;
    }

    try {
      const res = await fetch(`https://brand-boostie-server.vercel.app/vouchers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          discountPercentage: discountNum,
          usageLimit: usageNum,
        }),
      });
      if (!res.ok) throw new Error("Failed to update voucher");
      Swal.fire("Success", "Voucher updated", "success");
      fetchVouchers();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div>

        <div className="flex justify-center my-4">
            <button 
            onClick={()=>navigate(-1)}
            className="btn btn-primary text-white"><IoMdArrowBack />Go Back</button>
        </div>

    <div className="max-w-4xl my-6 mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Vouchers</h2>

        {/* Add voucher form */}
        <form onSubmit={handleAddVoucher} className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
            <input
            type="text"
            name="code"
            placeholder="Voucher Code"
            value={newVoucher.code}
            onChange={handleInputChange}
            className="input input-bordered flex-grow"
            required
            />
            <input
            type="number"
            name="discountPercentage"
            placeholder="Discount %"
            value={newVoucher.discountPercentage}
            onChange={handleInputChange}
            className="input input-bordered w-28"
            min={0}
            max={100}
            required
            />
            <input
            type="number"
            name="usageLimit"
            placeholder="Use Limit"
            value={newVoucher.usageLimit}
            onChange={handleInputChange}
            className="input input-bordered w-28"
            min={1}
            required
            />
            <button type="submit" className="btn btn-primary text-white">
            Add Voucher
            </button>
        </form>

        {/* Vouchers Table */}
        {loading ? (
            <p>Loading vouchers...</p>
        ) : vouchers.length === 0 ? (
            <p>No vouchers found.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Discount %</th>
                    <th>Used / Max</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vouchers.map(({ _id, code, discountPercentage, usedCount = 0, usageLimit = 1, createdAt }) => {
                    const isExpired = usedCount >= usageLimit;
                    const editable = editValues[_id] || {};

                    return (
                    <tr key={_id} className={isExpired ? "text-red-500" : ""}>
                        <td>
                        <input
                            type="text"
                            value={editable.code || ""}
                            disabled={isExpired}
                            onChange={(e) => handleEditInputChange(_id, "code", e.target.value)}
                            className="input input-sm input-bordered w-full"
                        />
                        </td>
                        <td>
                        <input
                            type="number"
                            value={editable.discountPercentage || ""}
                            disabled={isExpired}
                            onChange={(e) => handleEditInputChange(_id, "discountPercentage", e.target.value)}
                            className="input input-sm input-bordered w-full"
                            min={0}
                            max={100}
                        />
                        </td>
                        <td>
                        <input
                            type="number"
                            value={editable.usageLimit || ""}
                            disabled={isExpired}
                            onChange={(e) => handleEditInputChange(_id, "usageLimit", e.target.value)}
                            className="input input-sm input-bordered w-full"
                            min={1}
                        />
                        <div className="text-sm text-gray-500">Used: {usedCount}</div>
                        </td>
                        <td>{isExpired ? "Expired" : "Active"}</td>
                        <td>{new Date(createdAt).toLocaleDateString()}</td>
                        <td className="flex gap-2">
                        <button
                            className="btn btn-sm btn-success"
                            disabled={isExpired}
                            onClick={() => handleUpdateVoucher(_id)}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-sm btn-error"
                            disabled={isExpired}
                            onClick={() => handleDeleteVoucher(_id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        )}
        </div>
    </div>
  );
};

export default AdminVoucherManager;
