import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, UtensilsCrossed, Scissors, ShoppingBag, Calendar, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categoryMap: { [key: string]: string } = {
  "Restaurants": "restaurant",
  "Épiceries": "grocery",
  "Salons": "salon",
  "Événements": "event",
  "Bars & Clubs": "bar_club"
};

const categories = [
  { icon: UtensilsCrossed, label: "Restaurants", path: "/restaurants", dbCategory: "restaurant" },
  { icon: ShoppingBag, label: "Épiceries", path: "/groceries", dbCategory: "grocery" },
  { icon: Scissors, label: "Salons", path: "/salons", dbCategory: "salon" },
  { icon: Calendar, label: "Événements", path: "/events", dbCategory: "event" },
  { icon: Music, label: "Bars & Clubs", path: "/bars-clubs", dbCategory: "bar_club" },
];

const countries = [
  "Sénégal", "Côte d'Ivoire", "Cameroun", "Congo", "Mali", "Maroc", "Algérie", "Tunisie"
];

const FilterSection = () => {
  const { toast } = useToast();

  const { data: categoryCounts = {} } = useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
      const counts: { [key: string]: number } = {};
      
      for (const category of categories) {
        const { count } = await supabase
          .from("places")
          .select("*", { count: "exact", head: true })
          .eq("category", category.dbCategory as "restaurant" | "grocery" | "salon" | "event" | "bar_club");
        counts[category.label] = count || 0;
      }
      
      return counts;
    }
  });

  const handleNearMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Position trouvée",
            description: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
          });
          // TODO: Filtrer les lieux par distance
        },
        (error) => {
          toast({
            title: "Erreur de géolocalisation",
            description: "Impossible d'accéder à votre position",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Géolocalisation non disponible",
        description: "Votre navigateur ne supporte pas la géolocalisation",
        variant: "destructive"
      });
    }
  };

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
            <Button 
              variant="hero" 
              size="lg" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleNearMe}
            >
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
                    <div className="text-xs text-muted-foreground mt-1">{categoryCounts[category.label] || 0} lieux</div>
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
