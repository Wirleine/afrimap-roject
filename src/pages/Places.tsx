import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import Footer from "@/components/Footer";

const Places = () => {
  const places = [
    { id: 1, name: "Le Petit Dakar", category: "Restaurant", country: "Sénégal", rating: 4.8, reviews: 245, address: "Paris 18ème", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop", open: true },
    { id: 2, name: "Afro Beauty", category: "Salon de coiffure", country: "Côte d'Ivoire", rating: 4.9, reviews: 189, address: "Paris 11ème", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop", open: true },
    { id: 3, name: "Marché Tropical", category: "Épicerie", country: "Cameroun", rating: 4.7, reviews: 156, address: "Montreuil", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop", open: false },
    { id: 4, name: "Chez Mama Afrika", category: "Restaurant", country: "Congo", rating: 4.8, reviews: 203, address: "Paris 19ème", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop", open: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Tous les lieux</h1>
          <p className="text-muted-foreground mt-2">500+ lieux africains référencés</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-glow transition-all cursor-pointer border-border/50">
              <div className="relative h-48 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {place.country}
                  </Badge>
                </div>
                {place.open && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-accent text-accent-foreground">Ouvert</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{place.name}</h3>
                  <p className="text-sm text-muted-foreground">{place.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{place.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({place.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {place.address}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Places;
