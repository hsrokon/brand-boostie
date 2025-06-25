import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTop';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className='min-h-screen w-full mx-auto'>
            <header className='sticky top-0 z-50 bg-white'>
                <Navbar></Navbar>
            </header>
            <main className='overflow-x-hidden'>
                <Outlet></Outlet>
            </main> 
            <footer>
                <Footer></Footer>
            </footer>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
};

export default Layout;