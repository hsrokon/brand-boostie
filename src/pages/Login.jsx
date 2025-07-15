import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";


const Login = () => {
    const [ errorMes, setErrorMes ] = useState({});
    const { loginUser, logInWithGoogle, logOutUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;

    try {
        const credential = await loginUser(email, password);
        const user = credential.user;

        if (!user.emailVerified) {
        Swal.fire({
            title: 'Email not verified!',
            text: 'Please check your email inbox to verify your account.',
            icon: 'warning',
        });
        await logOutUser();
        return;
        }

        const lastLoggedIn = user.metadata.lastLoginAt;
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        const firstSignedUp = user.metadata.createdAt;
        const logInInfo = { email, displayName, photoURL, firstSignedUp, lastLoggedIn };

        // 1st: Check if user exists
        const res = await fetch(`http://localhost:5000/users/${email}`);
        let method = 'POST';
        if (res.status !== 404) {
        const data = await res.json();
        if (data) method = 'PATCH';
        }

        // 2nd: Save or update user — add a log!
        const saveRes = await fetch('http://localhost:5000/users', {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(logInInfo),
        });

        const saveData = await saveRes.json();
        console.log('✅ User saved/updated:', saveData);

        Swal.fire({
        title: "You've successfully logged in!",
        icon: 'success',
        });

        navigate(location?.state || '/');

    } catch (error) {
        const errorCode = error.code || error.message;
        setErrorMes({ ...errorMes, login: errorCode });
        console.log(errorCode);
    }
    };



    //google login
    const handleGoogleLogIn = async () => {
        try {
            const credential = await logInWithGoogle();
            const user = credential.user;

            const email = user.email;
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            const lastLoggedIn = user.metadata.lastLoginAt;
            const firstSignedUp = user.metadata.createdAt;
            const logInInfo = { email, displayName, photoURL, firstSignedUp, lastLoggedIn };

            const res = await fetch(`http://localhost:5000/users/${email}`);
            let method = 'POST';
            if (res.status !== 404) {
            const data = await res.json();
            if (data) method = 'PATCH';
            }

            await fetch('http://localhost:5000/users', {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(logInInfo),
            });

            navigate(location?.state || '/');

        } catch (error) {
            const errorCode = error.code || error.message;
            setErrorMes({ ...errorMes, login: errorCode });
            console.log(errorCode);
        }
        };

    const [ showPass, setShowPass ] = useState(false)

    return (
        <div className="min-h-screen flex flex-col">

            <Link to={'/'}><h2 className="pl-30 pt-10 text-xl font-bold self-start text-base-content">&#10095; Home</h2></Link>

            <div className="flex flex-1 flex-col gap-2 md:gap-4 items-center justify-center">
                <h2 className="text-2xl font-semibold">Log in</h2>
                <div className="card bg-primary w-[19rem] md:w-full max-w-sm shrink-0 rounded shadow-2xl shadow-primary text-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <fieldset className="fieldset gap-0.5 md:gap-1.5">

                        <label className="text-sm">Email</label>
                        <input 
                        type="email" 
                        required
                        name="email"
                        className="input rounded text-base-content w-full" 
                        placeholder="Email" />

                        <label className="text-sm">Password</label>
                        <div className="relative">
                            <input 
                            type={`${showPass ? 'text' : 'password'}`} 
                            name="pass"
                            required
                            className="input rounded text-base-content w-full" 
                            placeholder="Password" />
                            <button 
                                type="button"
                                onClick={()=> setShowPass(!showPass)}
                                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-base-content text-lg z-20">
                                    {
                                        showPass ? <FaEyeSlash /> : <FaEye/>
                                    }
                            </button>
                        </div>
                        
                        <div><a className="link link-hover">Forgot password?</a></div>
                        {
                            errorMes.login && <p className="font-semibold text-white">
                                <span className="text-base-content">&#10095;&#10095;</span> Error: {errorMes.login}</p>
                        }
                        <button type="submit" className="btn btn-primary text-white border-base-100 rounded mt-2">Log in</button>
                        </fieldset>

                        <div className="divider -my-1 md:my-0 text-xs md:text-sm">OR</div>

                        <button 
                        type="button"
                        onClick={handleGoogleLogIn}
                        className="btn bg-white rounded text-black border-0">
                            <FcGoogle/>
                            Login with Google
                        </button>

                        <p className="text-center text-sm">Don't have an account? 
                            <Link to={'/auth/signup'} className="underline font-semibold">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;