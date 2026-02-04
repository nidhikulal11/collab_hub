import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-cta flex items-center justify-center">
                <Rocket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span>CollabHub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              The platform where student innovators connect, collaborate, and build amazing projects together.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/projects" className="hover:text-primary transition-colors">Browse Projects</Link></li>
              <li><Link to="/post-project" className="hover:text-primary transition-colors">Post a Project</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Find Teammates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CollabHub. Built for students, by students.
        </div>
      </div>
    </footer>
  );
}
