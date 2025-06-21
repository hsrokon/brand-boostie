import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTop';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className='min-h-screen w-full mx-auto'>
            <header>
                <Navbar></Navbar>
            </header>
            <main>
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