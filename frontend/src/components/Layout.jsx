import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-appbg font-sans">
      <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Quick Basket</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === '/' ? 'bg-white text-primary shadow-sm' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
              >
                Terminal
              </Link>
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${location.pathname === '/admin' ? 'bg-white text-secondary shadow-sm' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
              >
                <Package className="w-4 h-4" />
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-6 relative z-10 w-full max-w-[1400px]">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Global Toast Notifications Container */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Layout;
