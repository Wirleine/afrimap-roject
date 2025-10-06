import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

const Events = () => {
  const events = [
    { id: 1, name: "Festival Afro-Caribéen", date: "2024-06-15", location: "Paris 13ème", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop", category: "Festival" },
    { id: 2, name: "Concert Afrobeat", date: "2024-05-20", location: "La Cigale, Paris", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop", category: "Concert" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Événements</h1>
          <p className="text-muted-foreground mt-2">45 événements à venir</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-glow transition-all cursor-pointer border-border/50">
              <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">{event.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-foreground">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location}
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

export default Events;
