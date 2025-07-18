import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPricingCardManager = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    price: '',
    frequency: '',
    planCategory: '',
    features: [],
    cta: ''
  });
  const [newFeature, setNewFeature] = useState('');
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const res = await fetch('https://brand-boostie-server.vercel.app/pricingCards');
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: 'Are you sure?', showCancelButton: true });
    if (confirm.isConfirmed) {
      await fetch(`https://brand-boostie-server.vercel.app/pricingCards/${id}`, {
        method: 'DELETE'
      });
      fetchPlans();
      Swal.fire('Deleted!', '', 'success');
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan._id);
    setFormData({
      category: plan.category,
      title: plan.title,
      price: plan.price,
      frequency: plan.frequency,
      planCategory: plan.planCategory,
      features: plan.features,
      cta: plan.cta
    });
  };

  const handleSave = async () => {
    const method = editingPlan ? 'PATCH' : 'POST';
    const url = editingPlan
      ? `https://brand-boostie-server.vercel.app/pricingCards/${editingPlan}`
      : 'https://brand-boostie-server.vercel.app/pricingCards';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setEditingPlan(null);
      setFormData({ category: '', title: '', price: '', frequency: '', planCategory: '', features: [], cta: '' });
      fetchPlans();
      Swal.fire('Saved successfully!', '', 'success');
    }
  };

  const handleAddFeature = () => {
    if (!newFeature) return;
    setFormData({ ...formData, features: [...formData.features, newFeature] });
    setNewFeature('');
  };

  const handleFeatureChange = (i, value) => {
    const updated = [...formData.features];
    updated[i] = value;
    setFormData({ ...formData, features: updated });
  };

  const handleRemoveFeature = (index) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData({ ...formData, features: updated });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Pricing Comparison Cards</h2>

      <div className="flex justify-center my-4">
        <button className="btn btn-primary text-white" onClick={() => navigate(-1)}>
          <IoMdArrowBack /> Go Back
        </button>
      </div>

      <div className="mb-10 border p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h3>

        <div className="grid grid-cols-2 gap-4">
          <input className="input input-bordered" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
          <input className="input input-bordered" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <input className="input input-bordered border border-base-300" placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} />
          <input className="input input-bordered border border-base-300" placeholder="Frequency" value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} />
          <input className="input input-bordered border border-base-300" placeholder="Plan Category" value={formData.planCategory} onChange={e => setFormData({ ...formData, planCategory: e.target.value })} />
          <input className="input input-bordered border border-base-300" placeholder="CTA Button Text" value={formData.cta} onChange={e => setFormData({ ...formData, cta: e.target.value })} />
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Add Feature</h4>
          <div className="flex gap-2">
            <input className="input input-bordered border border-base-300 w-full" placeholder="Feature" value={newFeature} onChange={e => setNewFeature(e.target.value)} />
            <button className="btn btn-sm btn-accent" onClick={handleAddFeature}>Add</button>
          </div>

          <ul className="mt-4 space-y-2">
            {formData.features.map((feature, i) => (
              <li key={i} className="flex gap-2 items-center">
                <input
                  className="input input-sm input-bordered border border-base-300 w-full"
                  value={feature}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                />
                <button onClick={() => handleRemoveFeature(i)} className="btn btn-xs btn-error text-white">✕</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="btn btn-primary text-white" onClick={handleSave}>{editingPlan ? 'Update Plan' : 'Add Plan'}</button>
          {editingPlan && <button className="btn btn-outline border-red-400 text-red-500 hover:bg-red-100" onClick={() => { setEditingPlan(null); setFormData({ category: '', title: '', price: '', frequency: '', planCategory: '', features: [], cta: '' }); }}>Cancel</button>}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">All Plans</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Frequency</th>
              <th>Plan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id}>
                <td>{plan.title}</td>
                <td>{plan.category}</td>
                <td>{plan.price}</td>
                <td>{plan.frequency}</td>
                <td>{plan.planCategory}</td>
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

export default AdminPricingCardManager;