import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ErrorPage from "../pages/ErrorPage";
import Pricing from "../pages/Pricing";
import CaseStudies from "../pages/CaseStudies";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/AdminDashboard";
import BlogDetails from "../components/blogs/BlogDetails";
import CaseStudyDetails from "../components/caseStudies/CaseStudyDetails";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {
                path: '/pricing',
                element: <Pricing></Pricing>
            },
            {
                path: '/caseStudies',
                element: <CaseStudies></CaseStudies>
            },
            {
                path: '/caseStudies/:id',
                element: <CaseStudyDetails></CaseStudyDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/caseStudies/${params.id}`)
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails></BlogDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/blogs/${params.id}`)
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: '/auth/login',
        element: <Login></Login>
    },
    {
        path: '/auth/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/admin/dashboard',
        element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
    }
])

export default router;