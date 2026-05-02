import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../components/Button";
import { loginUser, registerUser } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await loginUser(formData.email, formData.password);
      } else {
        await registerUser(formData.name, formData.email, formData.password);
      }
      await login(); // Updates global state
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-background absolute top-0 left-0 z-[100] font-sans text-foreground">
      {/* Left Side - Peaceful Display */}
      <div className="hidden md:flex md:w-1/2 bg-cream flex-col justify-between p-12 relative overflow-hidden">
        
        <div className="relative z-10 flex items-baseline gap-2">
          <span className="font-serif text-3xl font-medium tracking-tight text-primary">Flexio.</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-5xl md:text-6xl text-foreground tracking-tight leading-tight mb-8">
            Welcome to a <br />
            <span className="text-primary italic">kinder room.</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-foreground font-serif text-xl mb-1">Gentle Guidance</h4>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">Personalized movement plans that respect your body's current state and limits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-foreground font-serif text-xl mb-1">Restful Recovery</h4>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">Sync your physical efforts with your sleep quality for sustainable, long-term health.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-muted-foreground text-sm font-bold tracking-widest uppercase">
          © {new Date().getFullYear()} Flexio Wellness.
        </div>
        
        <img src="/peaceful_yoga.png" alt="Yoga" className="absolute bottom-[-10%] right-[-10%] w-[60%] opacity-20 filter mix-blend-multiply pointer-events-none rounded-full blur-[2px]" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-background border-l border-border">
        <Link to="/" className="absolute top-8 right-8 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          Back to home
        </Link>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h3 className="font-serif text-4xl text-foreground tracking-tight mb-2">
                  {isLogin ? "Welcome back" : "Take the first step"}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {isLogin ? "Enter your details to access your dashboard." : "Create a free account to start your gentle fitness journey."}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border-l-4 border-destructive text-destructive text-sm font-bold tracking-wide rounded-r-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="w-full">
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                    <input
                      className="w-full bg-transparent border-b-2 border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-medium placeholder-muted-foreground/50"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="w-full">
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                  <input
                    className="w-full bg-transparent border-b-2 border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-medium placeholder-muted-foreground/50"
                    type="email"
                    placeholder="hello@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex justify-between">
                    Password
                    {isLogin && <a href="#" className="normal-case text-primary hover:text-foreground">Forgot?</a>}
                  </label>
                  <input
                    className="w-full bg-transparent border-b-2 border-border py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-medium placeholder-muted-foreground/50"
                    type="password"
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full mt-8 group text-lg py-4 btn-primary" disabled={loading}>
                  {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>

              <div className="mt-10 text-center border-t border-border pt-8">
                <p className="text-muted-foreground font-medium">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError(null);
                    }}
                    className="text-foreground font-bold hover:text-primary transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
