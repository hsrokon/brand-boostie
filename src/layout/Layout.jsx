import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppButton from '../components/WhatsappButton';

const Layout = () => {
    return (
        <div className='min-h-screen w-full mx-auto'>
            <ScrollToTop></ScrollToTop>
            <header className='sticky top-0 z-50 bg-white'>
                <Navbar></Navbar>
            </header>
            <main className='overflow-x-hidden overflow-y-hidden'>
                <Outlet></Outlet>
            </main> 
            <footer>
                <Footer></Footer>
            </footer>
            <WhatsAppButton></WhatsAppButton>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
};

export default Layout;