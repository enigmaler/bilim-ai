import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/common/Header';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-violet-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
