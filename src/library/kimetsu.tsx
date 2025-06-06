import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
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

// Imágenes para productos Kimetsu no Yaiba (reemplaza con tus rutas reales)
import knyModel1 from "../assets/Products/anime/k1.png";
import knyModel2 from "../assets/Products/anime/k2.png";
import knyModel3 from "../assets/Products/lolmodel3.png";
import knyModel4 from "../assets/Products/anime/k3.png";

const products = [
  {
    id: 1,
    name: "Katana Nichirin Réplica",
    description:
      "Réplica de las legendarias katanas usadas por los cazadores de demonios. Cada hoja está forjada con acero especial que cambia de color según su portador, como las auténticas espadas Nichirin.",
    price: 45,
    image: knyModel1,
    characteristics: [
      "Material: PLA+",
      "Longitud: 100 cm",
      "Colores: Negro, Amarillo, Blanco",
    ],
    tags: ["arma", "replica"],
  },
  {
    id: 2,
    name: "Máscara de Tanjiro",
    description:
      "Réplica exacta de la máscara de madera que Tanjiro usa para proteger su identidad. Inspirada en los diseños tradicionales japoneses de los cazadores de demonios.",
    price: 22,
    image: knyModel2,
    characteristics: [
      "Material: PLA+",
      "Tamaño: Ajustable",
      "Color: Blanco, Rojo, Negro",
    ],
    tags: ["accesorio", "tanjiro"],
  },
  {
    id: 3,
    name: "Llavero Demon Slayer Corps",
    description:
      "El símbolo del Cuerpo de Cazadores de Demonios en un llavero metálico. Lleva contigo el emblema de aquellos que protegen a la humanidad de las criaturas de la noche.",
    price: 8,
    image: knyModel3,
    characteristics: [
      "Material: Aleación de zinc",
      "Tamaño: 4 cm de diámetro",
      "Acabado: Envejecido para efecto antiguo",
    ],
    tags: ["llavero", "emblema"],
  },
  {
    id: 4,
    name: "Figura Nezuko con Caja",
    description:
      "Nezuko Kamado en su forma demoníaca, incluida con su icónica caja de viaje. Captura perfectamente el diseño del personaje con todos sus detalles característicos.",
    price: 35,
    image: knyModel4,
    characteristics: [
      "Material: PVC de alta calidad",
      "Altura: 18 cm (figura), 25 cm (con caja)",
      "Base incluida con diseño de bambú",
    ],
    tags: ["figura", "nezuko"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Kimetsu: React.FC = () => {
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
      primary: { main: "#E53935" }, // Rojo sangre como las espadas
      secondary: { main: "#1A237E" }, // Azul noche como los uniformes
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
          background: `linear-gradient(90deg, #E53935 0%, #1A237E 100%)`,
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
          boxShadow: "0 0 12px #E53935",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Terjays Studio - Demon Slayer
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
          backgroundImage: `url(https://wallpapercave.com/wp/wp9413174.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 3,
          mx: "auto",
          mb: 4,
          boxShadow: "0 4px 15px rgba(229, 57, 53, 0.6)",
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
          Catálogo Kimetsu no Yaiba
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
          Productos inspirados en el universo de Demon Slayer. 
          Desde réplicas de katanas Nichirin hasta figuras de tus cazadores favoritos.
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
                    ? "0 0 20px 2px #E53935"
                    : "0 0 20px 2px rgba(229, 57, 53, 0.4)",
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
                card.style.boxShadow = "0 0 30px 5px rgba(229, 57, 53, 0.7)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 0 20px 2px rgba(229, 57, 53, 0.4)";
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
                  boxShadow: "0 0 12px rgba(229, 57, 53, 0.5)",
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

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 5, fontWeight: "bold" }}
            onClick={() => alert(`¡Gracias por comprar ${selectedProduct.name}!`)}
          >
            Comprar
          </Button>

          <Button
            sx={{ mt: 3, color: theme.palette.text.secondary }}
            onClick={() => setSelectedProduct(null)}
          >
            Cerrar
          </Button>
        </Box>
      )}

      <Footer />
    </ThemeProvider>
  );
};

export default Kimetsu;