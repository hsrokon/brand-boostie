import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const Dashboard = () => {
    const { user, updateUserProfile } = useContext(AuthContext);

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
                <h1 className="text-2xl lg:text-3xl">Hey, <span className="text-primary">{user?.displayName}</span> hope you're doing great!</h1>
                <p className="mt-4 text-sm lg:text-base">&#10095; Email: <span className="font-semibold text-primary">{user?.email}</span></p>
                <div className="md:w-96 md:h-80 mt-4">
                    <img className="w-full h-full object-cover" src={user?.photoURL} alt="" />
                </div>
               
                <div className="mt-3 md:mt-5 lg:mt-10">
                    <Link to={'/'} className="md:text-xl font-semibold hover:text-primary hover:underline">&#10095; Go home</Link>
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