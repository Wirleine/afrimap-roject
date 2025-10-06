import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const Users = () => {
  const users = [
    { id: 1, name: "Marie Diallo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie", joined: "2024-01", reviews: 45 },
    { id: 2, name: "Kofi Mensah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi", joined: "2024-02", reviews: 32 },
    { id: 3, name: "Aminata Traoré", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata", joined: "2024-01", reviews: 58 },
    { id: 4, name: "Ibrahim Kane", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim", joined: "2024-03", reviews: 21 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Communauté</h1>
          <p className="text-muted-foreground mt-2">10 000+ membres actifs</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-glow transition-all border-border/50">
              <CardContent className="p-6 text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">Membre depuis {user.joined}</p>
                </div>
                <Badge variant="secondary">{user.reviews} avis</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Users;
