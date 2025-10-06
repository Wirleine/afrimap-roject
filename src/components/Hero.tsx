import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Toute l'Afrique à portée de main</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Vivre l'Afrique,
            <br />
            <span className="gradient-sunset bg-clip-text text-transparent">même en France</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Découvrez restaurants, salons, commerces et événements africains près de chez vous
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="xl" className="group">
              <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explorer la carte
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Ajouter mon commerce
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-sm md:text-base text-white/70">Lieux référencés</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-white">54</div>
              <div className="text-sm md:text-base text-white/70">Pays africains</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
              <div className="text-sm md:text-base text-white/70">Utilisateurs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
