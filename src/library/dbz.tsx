import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  IconButton,
  Container,
  createTheme,
  ThemeProvider,
  Chip,
  Stack,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import { animateScroll as scroll } from "react-scroll";
import Footer from "../components/Footer";
import dbzBanner from "../assets/dbz.jpg";
// Imágenes para productos DBZ (deberás reemplazar estas rutas con tus imágenes reales)
import db1 from "../assets/Products/anime/db1.png";
import db2 from "../assets/Products/anime/db2.png"
import BuyButton from "../components/BuyButton";


const products = [
  {
    id: 1,
    name: "Esferas del Dragón",
    description:
      "Las legendarias esferas que conceden deseos cuando se reúnen las siete. Cada esfera contiene en su interior estrellas que indican su número. ¿Qué deseo pedirías si las tuvieras todas?",
    price: 15,
    image: db1,
    characteristics: [
      "Material: PLA de alta calidad",
      "Tamaño: 5 cm de diámetro cada esfera",
      "Incluye base de exhibición",
    ],
    tags: ["coleccionable", "esferas"],
  },
  {
    id: 2,
    name: "Llavero Kamehameha",
    description:
      "El poderoso ataque de Goku en la palma de tu mano. Este llavero representa la técnica más icónica de Dragon Ball, con detalles luminiscentes que simulan la energía del Kamehameha.",
    price: 8,
    image: db2,
    characteristics: [
      "Material: Resina con acabado metálico",
      "Efecto luminiscente",
      "Tamaño: 6 x 4 cm",
    ],
    tags: ["llavero", "goku"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Dbz: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    // Cerrar panel si se hace clic fuera
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
      primary: { main: "#FFD700" }, // Dorado como el Super Saiyajin
      secondary: { main: "#FF0000" }, // Rojo como el atuendo de Goku
      background: {
        default: mode === "dark" ? "#121212" : "#fafafa",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
        secondary: "gray",
      },
    },
    typography: {
      fontFamily: "'Rajdhani', 'Orbitron', 'Poppins', sans-serif",
    },
    shape: { borderRadius: 10 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: `linear-gradient(90deg, #FF0000 0%, #FFD700 100%)`,
          py: 1.5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 22,
          letterSpacing: 3,
          userSelect: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          boxShadow: "0 0 12px #FF0000",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Terjays Studio - Dragon Ball Z
        <IconButton
          onClick={toggleMode}
          color="inherit"
          aria-label="toggle dark mode"
          size="large"
          sx={{ color: "white" }}
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 180, sm: 250 },
          backgroundImage: `url(${dbzBanner})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          mx: "auto",
          mb: 4,
          boxShadow: "0 4px 15px rgba(255, 215, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            textShadow: "0 0 12px rgba(0,0,0,0.7)",
            fontWeight: "bold",
            letterSpacing: 4,
            textAlign: "center",
            px: 2,
          }}
        >
          Catálogo Dragon Ball Z
        </Typography>
      </Box>

      {/* Título principal */}
      <Box
        sx={{
          py: { xs: 4, sm: 6 },
          px: 2,
          textAlign: "center",
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Productos inspirados en la legendaria serie Dragon Ball Z. 
          Desde esferas del dragón hasta figuras de tus Saiyajins favoritos.
        </Typography>
      </Box>

      {/* Filtros */}
      <Container sx={{ mb: 4 }}>
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

      {/* Productos */}
      <Container sx={{ pb: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 5,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {filteredProducts.map(({ id, name, description, image }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.2 }}
              style={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 16,
                boxShadow:
                  mode === "dark"
                    ? "0 0 20px 2px #FFD700"
                    : "0 0 20px 2px rgba(255, 215, 0, 0.4)",
                padding: 24,
                flex: "1 1 300px",
                maxWidth: 320,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setSelectedProduct(products.find(p => p.id === id) || null)}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1.07)";
                card.style.boxShadow = "0 0 30px 5px rgba(255, 215, 0, 0.7)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 0 20px 2px rgba(255, 215, 0, 0.4)";
              }}
            >
              <img
                src={image}
                alt={name}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  marginBottom: 20,
                  maxHeight: 200,
                  objectFit: "contain",
                  boxShadow: "0 0 12px rgba(255, 215, 0, 0.5)",
                }}
                loading="lazy"
              />
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {description}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Panel desplegable producto seleccionado */}
      {selectedProduct && (
        <Box
          ref={panelRef}
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: 360 },
            height: "100%",
            bgcolor: theme.palette.background.paper,
            boxShadow: "-2px 0 15px rgba(0,0,0,0.5)",
            p: 4,
            overflowY: "auto",
            zIndex: 1500,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1, color: theme.palette.primary.main }}
          >
            {selectedProduct.name}
          </Typography>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              borderRadius: 14,
              marginBottom: 16,
              boxShadow: `0 0 20px 5px ${theme.palette.primary.main}`,
              objectFit: "contain",
              maxHeight: 220,
            }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedProduct.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Características:
          </Typography>
          <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
            {selectedProduct.characteristics.map((c, idx) => (
              <li key={idx}>
                <Typography variant="body2" color="text.secondary">
                  {c}
                </Typography>
              </li>
            ))}
          </ul>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 3,
            }}
          >
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

export default Dbz;