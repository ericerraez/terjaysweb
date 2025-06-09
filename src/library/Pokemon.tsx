import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CssBaseline,
  IconButton,
  Container,
  createTheme,
  ThemeProvider,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import { animateScroll as scroll } from "react-scroll";

import Footer from "../components/Footer";
import banner1 from "../assets/pokemon.avif";
import model1 from "../assets/Products/p1.png";
import model2 from "../assets/Products/model2.png";
import model3 from "../assets/Products/model3.png";
import BuyButton from "../components/BuyButton";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  characteristics: string[];
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Llavero Pokeball",
    description:
      "Por fuera, solo metal y color. Por dentro... un silencio suave, una espera eterna. Guarda sueños, fuerza y amistad. Y aunque a veces se olvida en una mochila, siempre está lista para abrirse... cuando su amigo la necesite.",
    price: 2,
    image: model1,
    characteristics: [
      "Material: PLA",
      "Colores: Rojo, Blanco, Negro",
      "Tamaño: 34x34x3.5 mm",
    ],
    tags: ["llavero", "pokeball", "accesorio"],
  },
  {
    id: 3,
    name: "Dragonite",
    description:
      "Forjado para los mejores. Este cuchillo mariposa es un símbolo de victoria, reservado solo para quienes han demostrado habilidad, estrategia y temple en los momentos más intensos.",
    price: 10,
    image: model2,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y gris metálico",
      "Tamaño: 120x30x15 mm",
    ],
    tags: ["pokemon", "decorativo", "dragon"],
  },
  {
    id: 4,
    name: "Reaver Karambit",
    description:
      "Envuelta en energía oscura, forjada con magia prohibida. Cada movimiento emite ecos del más allá, reflejando el poder corrupto del Reaver.",
    price: 10,
    image: model3,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y rojo oscuro",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["arma", "coleccionable", "personalizado"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Pokemon: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("themeMode", next);
  };

  const handleFilterClick = (tag: string) => {
    if (activeFilter === tag) {
      setActiveFilter(null);
    } else {
      setActiveFilter(tag);
    }
  };

  // Filtrar productos basado en el filtro activo
  const filteredProducts = activeFilter 
    ? products.filter(product => product.tags?.includes(activeFilter))
    : products;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#FFCB05" },
      secondary: { main: "#3B4CCA" },
      background: {
        default: mode === "dark" ? "#1c1c1c" : "#f0f0f0",
        paper: mode === "dark" ? "#2b2b2b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
        secondary: "gray",
      },
    },
    typography: {
      fontFamily: "'Press Start 2P', cursive",
    },
    shape: { borderRadius: 8 },
  });

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    const card = e.currentTarget;
    card.style.transform = isHovering ? "scale(1.05)" : "scale(1)";
    card.style.boxShadow = isHovering 
      ? `0 0 25px 5px ${theme.palette.primary.main}` 
      : `0 0 20px ${theme.palette.primary.main}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          fontSize: 18,
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: 2,
          cursor: "pointer",
          boxShadow: "0 0 10px #3B4CCA",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Pokémon 3D Store, click en la pokedex para ver los pokemon
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, borderRadius: 4, overflow: "hidden", position: "relative" }}>
        <img
          src={banner1}
          alt="Banner Pokemon"
          style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 320 }}
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            left: 24,
            fontSize: 32,
            color: "#fff",
            fontWeight: 900,
            textShadow: "2px 2px 12px #000",
            letterSpacing: 2,
          }}
        >
          ¡Atrápalos todos!
        </Typography>
      </Box>

      <Container sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            backgroundColor: theme.palette.background.paper,
            padding: 20,
            borderRadius: 16,
            boxShadow: `0 0 16px ${theme.palette.secondary.main}`,
            width: 320,
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => navigate("/library/pokedex")}
        >
          <img
            src="https://gaming-cdn.com/images/products/16585/screenshot/screenbound-pc-game-steam-wallpaper-2.jpg?v=1729067107"
            alt="Pokedex"
            style={{
              width: "100%",
              borderRadius: 12,
            }}
          />
        </motion.div>
      </Container>

      {/* Filtros */}
      <Container sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Filtrar por categoría:
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag.charAt(0).toUpperCase() + tag.slice(1)}
              onClick={() => handleFilterClick(tag)}
              variant={activeFilter === tag ? "filled" : "outlined"}
              color="primary"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                borderWidth: 2,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                },
              }}
            />
          ))}
          {activeFilter && (
            <Chip
              label="Todos"
              onClick={() => setActiveFilter(null)}
              variant="outlined"
              color="secondary"
              sx={{
                fontWeight: "bold",
                borderWidth: 2,
              }}
            />
          )}
        </Stack>
      </Container>

      <Container sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Productos Destacados
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: theme.palette.background.paper,
                padding: 20,
                borderRadius: 12,
                width: 280,
                boxShadow: `0 0 20px ${theme.palette.primary.main}`,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: 10 }}
              />
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description.slice(0, 90)}...
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product.tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>

      {selectedProduct && (
        <Box
          ref={panelRef}
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: 400 },
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "-6px 0 24px rgba(0,0,0,0.6)",
            padding: 3,
            overflowY: "auto",
            zIndex: 1200,
          }}
          component={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Typography variant="h5" gutterBottom>
            {selectedProduct.name}
          </Typography>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{ width: "100%", borderRadius: 10, marginBottom: 16 }}
          />
          <Typography variant="body1" component="p">
            {selectedProduct.description}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom>
            Características:
          </Typography>
          <ul>
            {selectedProduct.characteristics.map((char, index) => (
              <li key={index}>
                <Typography variant="body2">{char}</Typography>
              </li>
            ))}
          </ul>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Etiquetas:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {selectedProduct.tags.map(tag => (
              <Chip 
                key={tag} 
                label={tag} 
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Typography variant="h6" sx={{ mt: 2 }}>
            Precio: ${selectedProduct.price}
          </Typography>
          
          <BuyButton 
        productName={selectedProduct.name} 
        price={selectedProduct.price}
      />
        </Box>
      )}

      <Footer />
    </ThemeProvider>
  );
};

export default Pokemon;