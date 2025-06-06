import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  IconButton,
  Container,
  createTheme,
  ThemeProvider,
  Divider,
  Drawer,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import BuyButton from "../components/BuyButton";

type PokemonType = string;

type Pokemon = {
  id: number;
  name: string;
  region: string;
  types: PokemonType[];
  image: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  characteristics: string[];
  gallery: string[];
};

const PRODUCT_DETAILS: { [id: number]: Product } = {
  1: {
    id: 1,
    name: "Bulbasaur",
    description: "Pokémon planta bla bla bla",
    price: 8,
    image: "https://res.cloudinary.com/tu_usuario/image/upload/model1.jpg",
    characteristics: ["Material: PLA", "Colores: verde, negro", "Tamaño: 34x34x3.5 mm"],
    gallery: [
      "https://res.cloudinary.com/tu_usuario/image/upload/model6.jpg",
      "https://res.cloudinary.com/tu_usuario/image/upload/ghost1.jpg",
    ],
  },
  149: {
    id: 149,
    name: "Dragonite",
    description: "Pokémon dragón con fuerza y velocidad impresionantes.",
    price: 20,
    image: "https://res.cloudinary.com/tu_usuario/image/upload/dragonite_main.jpg",
    characteristics: ["Material: Resina", "Color: naranja", "Tamaño: 50x50x40 mm"],
    gallery: [
      "https://res.cloudinary.com/tu_usuario/image/upload/dragonite_1.jpg",
      "https://res.cloudinary.com/tu_usuario/image/upload/dragonite_2.jpg",
    ],
  },
};

function getRegionById(id: number): string {
  if (id >= 1 && id <= 151) return "Kanto";
  if (id >= 152 && id <= 251) return "Johto";
  if (id >= 252 && id <= 386) return "Hoenn";
  if (id >= 387 && id <= 493) return "Sinnoh";
  if (id >= 494 && id <= 649) return "Unova";
  if (id >= 650 && id <= 721) return "Kalos";
  if (id >= 722 && id <= 809) return "Alola";
  if (id >= 810 && id <= 898) return "Galar";
  if (id >= 899 && id <= 1010) return "Paldea";
  return "Desconocida";
}

const REGION_OPTIONS = ["Todas", "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"];
const TYPE_OPTIONS = [
  "Todos",
  "grass",
  "fire",
  "water",
  "electric",
  "bug",
  "normal",
  "fighting",
  "flying",
  "ground",
  "rock",
  "ghost",
  "steel",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "psychic",
  "poison",
];

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [selectedType, setSelectedType] = useState("Todos");

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (poke: { name: string; url: string }) => {
            const res = await fetch(poke.url);
            const details = await res.json();

            const id = details.id;
            const region = getRegionById(id);
            const types: PokemonType[] = details.types.map((t: any) => t.type.name);
            const image = details.sprites.front_default;

            return {
              id,
              name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
              region,
              types,
              image,
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchRegion = selectedRegion === "Todas" || pokemon.region === selectedRegion;
    const matchType = selectedType === "Todos" || pokemon.types.includes(selectedType);
    return matchRegion && matchType;
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#1976d2" },
          secondary: { main: "#ac3b61" },
          background: { paper: darkMode ? "#121212" : "#fff" },
        },
        typography: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          h5: { fontWeight: 700 },
          h6: { fontWeight: 600 },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingY: 4, display: "flex", gap: 2 }}>
        <Box flex={1} display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between" mb={2}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Región</InputLabel>
              <Select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} label="Región">
                {REGION_OPTIONS.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Tipo</InputLabel>
              <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} label="Tipo">
                {TYPE_OPTIONS.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {loading ? (
            <Typography>Cargando Pokémon...</Typography>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={3}
              flex={1}
              overflow="auto"
            >
              {filteredPokemons.map((pokemon) => (
                <motion.div
                  key={pokemon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: pokemon.id * 0.02 }}
                >
                  <Box
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      cursor: "pointer",
                      "&:hover": { boxShadow: 6 },
                      minHeight: 220,
                    }}
                    onClick={() => setSelectedPokemon(pokemon)}
                  >
                    <Box component="img" src={pokemon.image} alt={pokemon.name} sx={{ width: 96, height: 96, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      #{pokemon.id} - {pokemon.name}
                    </Typography>
                    <Divider sx={{ width: "100%", mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Región: {pokemon.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo: {pokemon.types.join(", ")}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}
        </Box>

        <Drawer
          anchor="right"
          open={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          PaperProps={{ sx: { width: 350, p: 2 } }}
        >
          {selectedPokemon ? (
            <>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                {selectedPokemon.name} #{selectedPokemon.id}
              </Typography>
              <Box
                component="img"
                src={PRODUCT_DETAILS[selectedPokemon.id]?.image || selectedPokemon.image}
                alt={selectedPokemon.name}
                sx={{ width: "100%", height: "auto", mb: 2 }}
              />
              <Typography mb={1}>
                {PRODUCT_DETAILS[selectedPokemon.id]?.description || "Sin descripción"}
              </Typography>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Precio: ${PRODUCT_DETAILS[selectedPokemon.id]?.price || "N/A"}
              </Typography>
              <Typography fontWeight="bold" mb={1}>
                Características:
              </Typography>
              <ul>
                {(PRODUCT_DETAILS[selectedPokemon.id]?.characteristics || []).map((charac, idx) => (
                  <li key={idx}>{charac}</li>
                ))}
              </ul>
              <Typography fontWeight="bold" mb={1}>
                Galería:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {(PRODUCT_DETAILS[selectedPokemon.id]?.gallery || []).map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`${selectedPokemon.name} gallery ${idx}`}
                    sx={{ width: 70, height: 70, objectFit: "cover", borderRadius: 1 }}
                  />
                ))}
              </Box>
            <BuyButton 
              productName={selectedPokemon.name} 
              price={PRODUCT_DETAILS[selectedPokemon.id]?.price ?? 0}
            />
          </>
        ) : (
          <Typography>No hay Pokémon seleccionado</Typography>
        )}
      </Drawer>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Pokedex;
