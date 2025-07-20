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
import Payment from "../pages/Payment";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../components/user/Dashboard";
import PaymentClaimsSection from "../components/adminDashboard/PaymentClaimSection";
import BlogPost from "../components/adminDashboard/BlogPost";
import CaseStudiesPost from "../components/adminDashboard/CaseStudiesPost";
import SubscribersList from "../components/adminDashboard/SubscribersList";
import AddTestimony from "../components/testimonials/AddTestimony";
import AdminPricingManager from "../components/adminDashboard/AdminPricingManager";
import AdminPricingCardManager from "../components/adminDashboard/AdminPricingCardManager";


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
                path: '/services/:serviceSlug',
                element: <Services />
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
                loader: ({params}) => fetch(`https://brand-boostie-server.vercel.app/caseStudies/${params.id}`)
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
                loader: ({params}) => fetch(`https://brand-boostie-server.vercel.app/blogs/${params.id}`)
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: 'payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            }
        ]
    },
    {
        path: '/auth/login',
        element: <Login></Login>
    },
    {
        path: '/auth/passReset',
        element: <ResetPassword></ResetPassword>
    },
    {
        path: '/auth/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/admin/dashboard',
        element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
    },
    {
        path: '/admin/dashboard/paymentClaims',
        element: <PaymentClaimsSection></PaymentClaimsSection>
    },
    {
        path: '/admin/dashboard/postBLog',
        element: <BlogPost></BlogPost>
    },
    {
        path: '/admin/dashboard/postCaseStudy',
        element: <CaseStudiesPost></CaseStudiesPost>
    },
    {
        path: '/admin/dashboard/managePricing',
        element: <AdminPricingManager></AdminPricingManager>
    },
    {
        path: '/admin/dashboard/managePricingCard',
        element: <AdminPricingCardManager></AdminPricingCardManager>
    },
    {
        path: '/admin/dashboard/subscribers',
        element: <SubscribersList></SubscribersList>
    },
    {
        path: '/user/Dashboard',
        element: <Dashboard></Dashboard>
    },
    {
        path: '/user/addTestimony',
        element: <PrivateRoute><AddTestimony></AddTestimony></PrivateRoute>
    }
])

export default router;