import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const MapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [2.3522, 48.8566], // Paris coordinates
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Add sample markers
      const sampleLocations = [
        { lng: 2.3522, lat: 48.8566, name: "Le Petit Dakar" },
        { lng: 2.3700, lat: 48.8700, name: "Afro Beauty" },
        { lng: 2.3300, lat: 48.8400, name: "Marché Tropical" },
      ];

      sampleLocations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "hsl(32 85% 45%)";
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;"><strong>${location.name}</strong></div>`
            )
          )
          .addTo(map.current!);
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Explorez la carte
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trouvez les lieux africains près de chez vous
            </p>
          </div>

          <Card className="overflow-hidden border-border/50 shadow-warm">
            {showTokenInput ? (
              <div className="p-12 text-center space-y-6 bg-muted/30">
                <div className="w-16 h-16 mx-auto rounded-full gradient-sunset flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Configuration de la carte</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Pour afficher la carte interactive, veuillez entrer votre token Mapbox public.
                    <br />
                    <a 
                      href="https://mapbox.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 mt-2"
                    >
                      Obtenir un token gratuit sur Mapbox.com
                    </a>
                  </p>
                </div>
                <form onSubmit={handleTokenSubmit} className="max-w-md mx-auto space-y-4">
                  <Input
                    type="text"
                    placeholder="pk.eyJ1Ijo..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="h-12"
                  />
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Navigation className="w-4 h-4" />
                    Activer la carte
                  </Button>
                </form>
              </div>
            ) : (
              <div ref={mapContainer} className="w-full h-[600px]" />
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
