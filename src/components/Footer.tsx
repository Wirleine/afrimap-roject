import { MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-sunset flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">AfriMap</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Vivre l'Afrique, même en France
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explorer</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Épiceries</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Salons</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Événements</a></li>
            </ul>
          </div>

          {/* Communauté */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Communauté</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Ajouter un lieu</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Devenir partenaire</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">À propos</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 AfriMap. Tous droits réservés. Fait avec ❤️ pour la diaspora africaine.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
