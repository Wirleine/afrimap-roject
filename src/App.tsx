import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Places from "./pages/Places";
import Countries from "./pages/Countries";
import Users from "./pages/Users";
import Restaurants from "./pages/Restaurants";
import Groceries from "./pages/Groceries";
import Salons from "./pages/Salons";
import Events from "./pages/Events";
import BarsClubs from "./pages/BarsClubs";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/places" element={<Places />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/users" element={<Users />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/salons" element={<Salons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bars-clubs" element={<BarsClubs />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
