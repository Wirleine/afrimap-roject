-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
    CREATE POLICY "Users can view their own profile"
      ON public.profiles FOR SELECT
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
    CREATE POLICY "Users can update their own profile"
      ON public.profiles FOR UPDATE
      USING (auth.uid() = id);
  END IF;
END $$;

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
  )
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new users if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create categories enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.place_category AS ENUM ('restaurant', 'grocery', 'salon', 'event', 'bar_club');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create places table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.places (
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

-- Create places policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'places' AND policyname = 'Places are viewable by everyone') THEN
    CREATE POLICY "Places are viewable by everyone"
      ON public.places FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'places' AND policyname = 'Only admins can create places') THEN
    CREATE POLICY "Only admins can create places"
      ON public.places FOR INSERT
      WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'places' AND policyname = 'Only admins can update places') THEN
    CREATE POLICY "Only admins can update places"
      ON public.places FOR UPDATE
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'places' AND policyname = 'Only admins can delete places') THEN
    CREATE POLICY "Only admins can delete places"
      ON public.places FOR DELETE
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

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
DROP TRIGGER IF EXISTS update_places_updated_at ON public.places;
CREATE TRIGGER update_places_updated_at
  BEFORE UPDATE ON public.places
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample places only if they don't exist
INSERT INTO public.places (name, category, country_id, description, address, city, latitude, longitude, rating, review_count, is_open, google_maps_url)
SELECT * FROM (VALUES
  ('Le Petit Dakar', 'restaurant'::place_category, (SELECT id FROM public.countries WHERE name = 'Sénégal'), 'Restaurant sénégalais authentique proposant des plats traditionnels', '15 Rue de la Chapelle', 'Paris 18ème', 48.8866, 2.3590, 4.8, 245, true, 'https://maps.google.com/?q=Le+Petit+Dakar+Paris'),
  ('Afro Beauty', 'salon'::place_category, (SELECT id FROM public.countries WHERE name = 'Côte d''Ivoire'), 'Salon de coiffure spécialisé en coiffure afro et tresses', '45 Boulevard Voltaire', 'Paris 11ème', 48.8635, 2.3758, 4.9, 189, true, 'https://maps.google.com/?q=Afro+Beauty+Paris'),
  ('Marché Tropical', 'grocery'::place_category, (SELECT id FROM public.countries WHERE name = 'Cameroun'), 'Épicerie africaine avec produits frais et exotiques', '12 Rue de Paris', 'Montreuil', 48.8634, 2.4430, 4.7, 156, true, 'https://maps.google.com/?q=Marché+Tropical+Montreuil'),
  ('Chez Mama Afrika', 'restaurant'::place_category, (SELECT id FROM public.countries WHERE name = 'Congo'), 'Restaurant congolais familial avec ambiance chaleureuse', '28 Rue du Faubourg Saint-Denis', 'Paris 10ème', 48.8720, 2.3547, 4.6, 198, true, 'https://maps.google.com/?q=Chez+Mama+Afrika+Paris')
) AS v(name, category, country_id, description, address, city, latitude, longitude, rating, review_count, is_open, google_maps_url)
WHERE NOT EXISTS (SELECT 1 FROM public.places WHERE places.name = v.name);