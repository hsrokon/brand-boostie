import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPricingManager = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({ service: '', starterPrice: '', professionalPrice: '', features: [] });
  const [newFeature, setNewFeature] = useState({ name: '', starter: '', professional: '' });
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const res = await fetch('https://brand-boostie-server.vercel.app/pricingPlans');
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: 'Are you sure?', showCancelButton: true });
    if (confirm.isConfirmed) {
      await fetch(`https://brand-boostie-server.vercel.app/pricingPlans/${id}`, { method: 'DELETE' });
      fetchPlans();
      Swal.fire('Deleted!', '', 'success');
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan._id);
    setFormData({
      service: plan.service,
      starterPrice: plan.starterPrice,
      professionalPrice: plan.professionalPrice,
      features: plan.features,
    });
  };

  const handleSave = async () => {
    const method = editingPlan ? 'PATCH' : 'POST';
    const url = editingPlan
      ? `https://brand-boostie-server.vercel.app/pricingPlans/${editingPlan}`
      : 'https://brand-boostie-server.vercel.app/pricingPlans';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setEditingPlan(null);
      setFormData({ service: '', starterPrice: '', professionalPrice: '', features: [] });
      fetchPlans();
      Swal.fire('Saved successfully!', '', 'success');
    }
  };

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index][key] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleAddFeature = () => {
    if (newFeature.name || newFeature.starter || newFeature.professional) {
      setFormData({ ...formData, features: [...formData.features, newFeature] });
      setNewFeature({ name: '', starter: '', professional: '' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Pricing Plans</h2>

      <div className="flex justify-center mb-8">
        <button className="btn btn-outline border-primary text-primary flex items-center gap-1" onClick={() => navigate(-1)}>
          <IoMdArrowBack size={20} /> Go Back
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-12 space-y-6">
        <h3 className="text-2xl font-semibold">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h3>

        <input
          type="text"
          placeholder="Service Name"
          className="input w-full input-bordered"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Starter Price"
            className="input input-bordered"
            value={formData.starterPrice}
            onChange={(e) => setFormData({ ...formData, starterPrice: +e.target.value })}
          />
          <input
            type="number"
            placeholder="Professional Price"
            className="input input-bordered"
            value={formData.professionalPrice}
            onChange={(e) => setFormData({ ...formData, professionalPrice: +e.target.value })}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">Add Feature</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Feature Name"
              className="input input-bordered"
              value={newFeature.name}
              onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Starter"
              className="input  input-bordered"
              value={newFeature.starter}
              onChange={(e) => setNewFeature({ ...newFeature, starter: e.target.value })}
            />
            <input
              type="text"
              placeholder="Professional"
              className="input input-bordered"
              value={newFeature.professional}
              onChange={(e) => setNewFeature({ ...newFeature, professional: e.target.value })}
            />
          </div>
          <button className="btn btn-accent mt-3" onClick={handleAddFeature}>Add Feature</button>
        </div>

        <div className="space-y-2">
          {formData.features.map((f, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                value={f.name}
                onChange={(e) => handleFeatureChange(i, 'name', e.target.value)}
                className="input input-sm input-bordered"
              />
              <input
                value={f.starter}
                onChange={(e) => handleFeatureChange(i, 'starter', e.target.value)}
                className="input input-sm input-bordered"
              />
              <input
                value={f.professional}
                onChange={(e) => handleFeatureChange(i, 'professional', e.target.value)}
                className="input input-sm input-bordered"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="btn btn-primary text-white" onClick={handleSave}>
            {editingPlan ? 'Update Plan' : 'Add Plan'}
          </button>
          {editingPlan && (
            <button
              className="btn btn-outline border-red-400 text-red-500 hover:bg-red-100"
              onClick={() => {
                setEditingPlan(null);
                setFormData({ service: '', starterPrice: '', professionalPrice: '', features: [] });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">All Plans</h3>
      <div className="overflow-x-auto border border-base-300 rounded-xl shadow-md">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Service</th>
              <th>Starter ৳</th>
              <th>Professional ৳</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id} className="hover:bg-base-100 transition">
                <td>{plan.service}</td>
                <td>{plan.starterPrice}</td>
                <td>{plan.professionalPrice}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(plan)} className="btn btn-sm btn-outline">Edit</button>
                  <button onClick={() => handleDelete(plan._id)} className="btn btn-sm btn-error text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPricingManager;
