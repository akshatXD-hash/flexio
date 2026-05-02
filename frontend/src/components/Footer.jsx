
import { Globe, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card text-foreground pt-20 pb-10 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-3xl font-medium tracking-tight text-primary">Flexio.</span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-medium leading-relaxed">
              Your health management platform. Plan your week, track your metrics, and view analytics.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-foreground tracking-widest uppercase">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/bmi" className="text-muted-foreground hover:text-primary transition-colors font-medium">Body Context</Link></li>
              <li><Link to="/workout" className="text-muted-foreground hover:text-primary transition-colors font-medium">Guided Sessions</Link></li>
              <li><Link to="/sleep" className="text-muted-foreground hover:text-primary transition-colors font-medium">Recovery Analytics</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors font-medium">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-foreground tracking-widest uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors font-medium">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-medium text-sm">
            © {new Date().getFullYear()} Flexio Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
