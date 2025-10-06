import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";

const places = [
  {
    id: 1,
    name: "Le Petit Dakar",
    category: "Restaurant",
    country: "Sénégal",
    rating: 4.8,
    reviews: 245,
    address: "Paris 18ème",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
    open: true,
    website: "https://maps.google.com/?q=Le+Petit+Dakar+Paris",
  },
  {
    id: 2,
    name: "Afro Beauty",
    category: "Salon de coiffure",
    country: "Côte d'Ivoire",
    rating: 4.9,
    reviews: 189,
    address: "Paris 11ème",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
    open: true,
    website: "https://maps.google.com/?q=Afro+Beauty+Paris",
  },
  {
    id: 3,
    name: "Marché Tropical",
    category: "Épicerie",
    country: "Cameroun",
    rating: 4.7,
    reviews: 156,
    address: "Montreuil",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
    open: false,
    website: "https://maps.google.com/?q=Marché+Tropical+Montreuil",
  },
  {
    id: 4,
    name: "Chez Mama Afrika",
    category: "Restaurant",
    country: "Congo",
    rating: 4.8,
    reviews: 203,
    address: "Paris 19ème",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    open: true,
    website: "https://maps.google.com/?q=Chez+Mama+Afrika+Paris",
  },
];

const FeaturedPlaces = () => {
  return (
    <section className="py-20 gradient-savanna">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Lieux populaires
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les adresses favorites de la communauté
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((place) => (
              <a 
                key={place.id}
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card 
                  className="overflow-hidden cursor-pointer hover:shadow-warm transition-smooth hover:-translate-y-2 group border-border/50"
                >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <Badge 
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-foreground"
                    variant="secondary"
                  >
                    {place.country}
                  </Badge>
                  {place.open && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/90 backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-secondary-foreground" />
                      <span className="text-xs font-medium text-secondary-foreground">Ouvert</span>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{place.category}</p>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-sm text-foreground">{place.rating}</span>
                    <span className="text-xs text-muted-foreground">({place.reviews} avis)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {place.address}
                  </div>
                </CardContent>
              </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaces;
