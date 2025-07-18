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
        e.preventDefault()

        const displayName = e.target.name.value || user.displayName;
        const photoURL = e.target.photo.value || user.photoURL;

        updateUserProfile(displayName, photoURL)
        .then(()=> {
            Swal.fire({
                    title: "User Profile Updated!",
                    icon: "success",
                    });
        })
        .catch(error => {
            console.log('Profile update error from dashboard', error);
        })
        e.target.reset();
    }

    return (
        <div className="min-h-screen w-10/12 mx-auto lg:grid lg:grid-cols-10 my-10">
            
            <div className="lg:col-span-6">
                <div className="my-10">
                    <Link to={'/'} className="md:text-3xl font-bold hover:text-primary hover:underline">&#10095; Home</Link>
                </div>
                <h1 className="text-2xl lg:text-3xl">Hey, <span className="text-primary">{user?.displayName}</span> hope you're doing great!</h1>
                <p className="mt-4 text-sm lg:text-base">&#10095; Email: <span className="font-semibold text-primary">{user?.email}</span></p>
                <div className="md:w-56 md:h-56 mt-4">
                    <img className="w-full h-full object-cover" src={user?.photoURL} alt="" />
                </div>

                {/* User Claim Status Section */}
                <div className="mt-10">
                    <h2 className="text-xl text-accent lg:text-3xl font-semibold mb-3">Your Service Claims</h2>
                    <div className="space-y-4">
                        {claims.length > 0 ? claims.map(claim => (
                            <div key={claim._id} className="bg-base-100 p-4 rounded-lg border shadow">
                                <p><strong>Service:</strong> {claim.service}</p>
                                <p><strong>Plan:</strong> {claim.plan}</p>
                                <p><strong>Status:</strong> <span className="text-primary font-semibold">{claim.status}!</span></p>
                                <p>
                                    <strong>Verified:</strong>
                                    <span className={`${claim.isVerified ? 'text-secondary' : 'text-red-600                 '}`}>{claim.isVerified ? " Yes" : " No"}</span> </p>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500">No service claims found.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 mt-8 md:mt-12 lg:mt-0">
                <h2 className="text-2xl">&#10095; Update your profile</h2>
                <div className="lg:mt-4">
                    <form onSubmit={handleSubmit} className="card-body">
                        <fieldset className="fieldset">
                            <label className="text-sm">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                className="input rounded-2xl text-base-content border-2 border-primary w-full" 
                                placeholder="Name" />

                            <label className="text-sm">Photo URL</label>
                            <input 
                                type="text" 
                                name="photo"
                                className="input rounded-2xl text-base-content border-2 border-primary w-full" 
                                placeholder="Profile photo URL" />

                            <button type="submit" className="btn btn-primary text-white border-base-100 rounded-2xl mt-2 md:mt-4">Update profile</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
