-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create countries table
CREATE TABLE public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  flag_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on countries
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Countries are viewable by everyone"
  ON public.countries FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage countries"
  ON public.countries FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create categories enum
CREATE TYPE public.place_category AS ENUM ('restaurant', 'grocery', 'salon', 'event', 'bar_club');

-- Create places table
CREATE TABLE public.places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category place_category NOT NULL,
  country_id UUID REFERENCES public.countries(id),
  description TEXT,
  address TEXT,
  city TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  website_url TEXT,
  google_maps_url TEXT,
  image_url TEXT,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_open BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on places
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Places are viewable by everyone"
  ON public.places FOR SELECT
  USING (true);

CREATE POLICY "Only admins can create places"
  ON public.places FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update places"
  ON public.places FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete places"
  ON public.places FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for places updated_at
CREATE TRIGGER update_places_updated_at
  BEFORE UPDATE ON public.places
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample African countries
INSERT INTO public.countries (name, description) VALUES
('Sénégal', 'Pays d''Afrique de l''Ouest connu pour sa culture riche et sa capitale Dakar.'),
('Côte d''Ivoire', 'Leader économique de l''Afrique de l''Ouest avec Abidjan comme capitale économique.'),
('Cameroun', 'Appelé "Afrique en miniature" pour sa diversité géographique et culturelle.'),
('Congo', 'Pays d''Afrique centrale riche en ressources naturelles.'),
('Mali', 'Pays sahelien connu pour son histoire et ses cités anciennes comme Tombouctou.'),
('Maroc', 'Pays d''Afrique du Nord avec une riche histoire impériale.'),
('Algérie', 'Plus grand pays d''Afrique par sa superficie.'),
('Tunisie', 'Berceau de la révolution du printemps arabe.'),
('Nigeria', 'Pays le plus peuplé d''Afrique avec une économie dynamique.'),
('Ghana', 'Premier pays subsaharien à obtenir son indépendance.'),
('Kenya', 'Hub technologique et économique de l''Afrique de l''Est.'),
('Éthiopie', 'Un des plus anciens pays d''Afrique, jamais colonisé.'),
('Afrique du Sud', 'Pays le plus industrialisé du continent africain.'),
('Égypte', 'Berceau de l''une des plus anciennes civilisations du monde.'),
('Tanzanie', 'Pays abritant le Kilimandjaro et le Serengeti.'),
('Ouganda', 'Perle de l''Afrique avec des paysages magnifiques.'),
('Angola', 'Pays lusophone riche en pétrole.'),
('Mozambique', 'Pays côtier avec de belles plages sur l''océan Indien.'),
('Madagascar', 'Île unique avec une biodiversité exceptionnelle.'),
('Zimbabwe', 'Pays abritant les célèbres chutes Victoria.'),
('Rwanda', 'Pays des mille collines en pleine reconstruction.'),
('Burkina Faso', 'Terre des hommes intègres avec une culture riche.'),
('Guinée', 'Château d''eau de l''Afrique de l''Ouest.'),
('Bénin', 'Berceau du vaudou et riche patrimoine historique.'),
('Togo', 'Petit pays côtier d''Afrique de l''Ouest.'),
('Sierra Leone', 'Pays avec de belles plages et diamants.'),
('Liberia', 'Première république d''Afrique.'),
('Mauritanie', 'Pont entre l''Afrique subsaharienne et le Maghreb.'),
('Niger', 'Pays sahélien avec des réserves naturelles.'),
('Tchad', 'Pays au cœur de l''Afrique avec le lac Tchad.'),
('Somalie', 'Pays de la Corne de l''Afrique.'),
('Soudan', 'Pays avec une histoire ancienne riche.'),
('Soudan du Sud', 'Plus jeune pays d''Afrique, indépendant depuis 2011.'),
('Érythrée', 'Pays côtier de la Corne de l''Afrique.'),
('Djibouti', 'Petit pays stratégique sur la mer Rouge.'),
('Gambie', 'Plus petit pays d''Afrique continentale.'),
('Guinée-Bissau', 'Pays lusophone d''Afrique de l''Ouest.'),
('Guinée équatoriale', 'Seul pays hispanophone d''Afrique.'),
('République Centrafricaine', 'Pays au cœur du continent africain.'),
('Gabon', 'Pays forestier riche en biodiversité.'),
('République du Congo', 'Pays d''Afrique centrale avec Brazzaville comme capitale.'),
('République Démocratique du Congo', 'Deuxième plus grand pays d''Afrique.'),
('Zambie', 'Pays riche en cuivre et nature sauvage.'),
('Malawi', 'Pays du lac Malawi avec des paysages magnifiques.'),
('Namibie', 'Pays avec le désert du Namib et une faune variée.'),
('Botswana', 'Pays stable avec le delta de l''Okavango.'),
('Lesotho', 'Royaume enclavé dans l''Afrique du Sud.'),
('Eswatini', 'Anciennement Swaziland, petit royaume d''Afrique australe.'),
('Comores', 'Archipel de l''océan Indien.'),
('Maurice', 'Île paradisiaque de l''océan Indien.'),
('Seychelles', 'Archipel paradisiaque avec des plages magnifiques.'),
('Cap-Vert', 'Archipel au large de l''Afrique de l''Ouest.'),
('São Tomé-et-Príncipe', 'Petit archipel de l''Afrique centrale.');

-- Insert sample places
INSERT INTO public.places (name, category, country_id, description, address, city, latitude, longitude, rating, review_count, is_open, google_maps_url, image_url) VALUES
(
  'Le Petit Dakar',
  'restaurant',
  (SELECT id FROM public.countries WHERE name = 'Sénégal'),
  'Restaurant sénégalais authentique proposant des plats traditionnels',
  '15 Rue de la Chapelle',
  'Paris 18ème',
  48.8866,
  2.3590,
  4.8,
  245,
  true,
  'https://maps.google.com/?q=Le+Petit+Dakar+Paris',
  null
),
(
  'Afro Beauty',
  'salon',
  (SELECT id FROM public.countries WHERE name = 'Côte d''Ivoire'),
  'Salon de coiffure spécialisé en coiffure afro et tresses',
  '45 Boulevard Voltaire',
  'Paris 11ème',
  48.8635,
  2.3758,
  4.9,
  189,
  true,
  'https://maps.google.com/?q=Afro+Beauty+Paris',
  null
),
(
  'Marché Tropical',
  'grocery',
  (SELECT id FROM public.countries WHERE name = 'Cameroun'),
  'Épicerie africaine avec produits frais et exotiques',
  '12 Rue de Paris',
  'Montreuil',
  48.8634,
  2.4430,
  4.7,
  156,
  true,
  'https://maps.google.com/?q=Marché+Tropical+Montreuil',
  null
),
(
  'Chez Mama Afrika',
  'restaurant',
  (SELECT id FROM public.countries WHERE name = 'Congo'),
  'Restaurant congolais familial avec ambiance chaleureuse',
  '28 Rue du Faubourg Saint-Denis',
  'Paris 10ème',
  48.8720,
  2.3547,
  4.6,
  198,
  true,
  'https://maps.google.com/?q=Chez+Mama+Afrika+Paris',
  null
);