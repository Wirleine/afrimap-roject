import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import Footer from "@/components/Footer";

const BarsClubs = () => {
  const barsClubs = [
    { id: 1, name: "Afro Lounge", country: "Multi-pays", rating: 4.6, reviews: 178, address: "Paris 10ème", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&auto=format&fit=crop", open: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Bars & Clubs</h1>
          <p className="text-muted-foreground mt-2">35 bars et clubs</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barsClubs.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-glow transition-all cursor-pointer border-border/50">
              <div className="relative h-48 overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">{place.country}</Badge>
                </div>
                {place.open && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-accent text-accent-foreground">Ouvert</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground">{place.name}</h3>
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

export default BarsClubs;
