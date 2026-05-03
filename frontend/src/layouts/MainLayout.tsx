import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <CartDrawer />
            <footer className="bg-white border-t py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>&copy; 2026 PC MASTER. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
