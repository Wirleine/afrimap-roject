import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, UtensilsCrossed, Scissors, ShoppingBag, Calendar, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const categories = [
  { icon: UtensilsCrossed, label: "Restaurants", count: 250, path: "/restaurants" },
  { icon: ShoppingBag, label: "Épiceries", count: 120, path: "/groceries" },
  { icon: Scissors, label: "Salons", count: 80, path: "/salons" },
  { icon: Calendar, label: "Événements", count: 45, path: "/events" },
  { icon: Music, label: "Bars & Clubs", count: 60, path: "/bars-clubs" },
];

const countries = [
  "Sénégal", "Côte d'Ivoire", "Cameroun", "Congo", "Mali", "Maroc", "Algérie", "Tunisie"
];

const FilterSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un restaurant, salon, événement..." 
              className="pl-12 pr-4 h-14 text-base shadow-warm border-border/50"
            />
            <Button variant="hero" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2">
              <MapPin className="w-4 h-4" />
              Près de moi
            </Button>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Catégories</h2>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
                Filtres
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link key={category.label} to={category.path}>
                  <button
                    className="p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-warm transition-smooth group w-full"
                  >
                    <category.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-semibold text-foreground">{category.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{category.count} lieux</div>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Par pays d'origine</h3>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <Badge 
                  key={country} 
                  variant="outline" 
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  {country}
                </Badge>
              ))}
              <Badge variant="secondary" className="px-4 py-2 cursor-pointer">
                + Voir tous les pays
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
