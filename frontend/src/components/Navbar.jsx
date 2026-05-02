import { Link, useLocation } from "react-router-dom";
import { Activity, LogOut, LogIn, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent rendering nav if on auth page intentionally
  if (location.pathname === '/auth') return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-800/90 backdrop-blur-md border-b border-emerald-primary/20 py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-primary p-1.5 rounded-sm group-hover:bg-slate-800 transition-colors duration-300">
              <Activity className="h-6 w-6 text-white transition-colors duration-300" strokeWidth={3} />
            </div>
            <span className="text-xl font-black text-emerald-text tracking-tighter uppercase">Flex<span className="text-emerald-dark drop-shadow-sm">io</span></span>
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/bmi" className="text-sm font-bold text-gray-400 hover:text-emerald-primary hover:underline transition-colors uppercase tracking-widest flex items-center gap-1">
                BMI
              </Link>
              <Link to="/workout" className="text-sm font-bold text-gray-400 hover:text-emerald-primary hover:underline transition-colors uppercase tracking-widest flex items-center gap-1">
                Workout
              </Link>
              <Link to="/sleep" className="text-sm font-bold text-gray-400 hover:text-emerald-primary hover:underline transition-colors uppercase tracking-widest flex items-center gap-1">
                Sleep
              </Link>
            </div>
          )}

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <Link to="/auth" className="flex items-center gap-2 bg-emerald-primary text-white px-5 py-2.5 rounded-sm font-bold text-sm tracking-wide hover:bg-slate-800 transition-all duration-300">
                Sign In <LogIn className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                {location.pathname !== '/dashboard' && (
                  <Link to="/dashboard" className="flex items-center gap-1 text-sm font-bold text-white group hover:text-emerald-primary transition-colors">
                    Dashboard <ChevronRight className="h-4 w-4 text-emerald-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors font-bold text-sm">
                  Logout <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
