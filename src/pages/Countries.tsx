import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const Countries = () => {
  const countries = [
    { name: "Sénégal", flag: "🇸🇳", description: "Le Sénégal, terre de la Teranga (hospitalité), est connu pour sa riche culture wolof, sa musique mbalax et sa cuisine savoureuse.", places: 120 },
    { name: "Côte d'Ivoire", flag: "🇨🇮", description: "Premier producteur mondial de cacao, la Côte d'Ivoire est célèbre pour son dynamisme économique et sa diversité culturelle.", places: 95 },
    { name: "Cameroun", flag: "🇨🇲", description: "Surnommé 'l'Afrique en miniature', le Cameroun offre une incroyable diversité de paysages, de cultures et de langues.", places: 78 },
    { name: "Congo", flag: "🇨🇬", description: "Le Congo, berceau de la rumba congolaise, est réputé pour sa musique, sa danse et sa gastronomie raffinée.", places: 85 },
    { name: "Mali", flag: "🇲🇱", description: "Terre des empires historiques, le Mali est célèbre pour Tombouctou, sa musique mandingue et son artisanat.", places: 62 },
    { name: "Maroc", flag: "🇲🇦", description: "Le Maroc enchante par ses médinas, sa cuisine épicée, son thé à la menthe et son hospitalité légendaire.", places: 142 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Pays africains</h1>
          <p className="text-muted-foreground mt-2">Découvrez la diversité culturelle de l'Afrique</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.name} className="hover:shadow-glow transition-all border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{country.flag}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{country.name}</h3>
                    <p className="text-sm text-muted-foreground">{country.places} lieux</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{country.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Countries;
