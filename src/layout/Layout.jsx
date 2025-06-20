import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/ScrollToTop';

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

            </footer>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    );
};

export default Layout;