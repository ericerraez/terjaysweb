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
import banner1 from "../assets/fortnite.jpg";
import banner2 from "../assets/Products/banner2.jpg";
import model1 from "../assets/Products/fortmodel1.png";
import model2 from "../assets/Products/fortmodel2.png";
import model3 from "../assets/Products/fortmodel3.png";
import model4 from "../assets/Products/fortmodel4.png";
import model5 from "../assets/Products/fortmodel5.png";

const banners = [banner1, banner2];

const products = [
  {
    id: 1,
    name: "Pavos fortnite",
    description:
      "Estas monedas vibrantes impulsan a los guerreros a luchar, construir y bailar, guardando el poder de cada victoria.",
    price: 5,
    image: model1,
    characteristics: [
      "Material: PLA",
      "Colores: Azul y plata",
      "Tamaño: 40x40x5 mm",
    ],
    tags: ["moneda", "coleccionable"],
  },
  {
    id: 2,
    name: "Flopper",
    description:
      "Flopper no habla, no construye... pero cuando aparece, salva partidas. Este pez regordete es más que una cura: es esperanza pura en medio del caos. Un clásico silencioso que todo veterano sabe valorar",
    price: 15,
    image: model2,
    characteristics: [
      "Material: PLA",
      "Colores: Neranja, Blanco, Negro, Amarillo",
      "Tamaño: 43,09 x 42,21 x 52,31 mm",
    ],
    tags: ["consumible", "coleccionable"],
  },
  {
    id: 3,
    name: "Llavero Fortnite",
    description:
      "No es solo un llavero, es un fragmento de la isla que llevas contigo. Cada vez que lo ves, recuerdas la tormenta, las construcciones imposibles y esas victorias épicas que te hicieron bailar. Un pequeño símbolo del caos divertido que es Fortnite.",
    price: 8,
    image: model3,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y gris metálico",
      "Tamaño: 120x70x15 mm",
    ],
    tags: ["llavero", "util"],
  },
  {
    id: 4,
    name: "Esqueleto de Bananín Lego",
    description:
      "Flopper no habla, no construye... pero cuando aparece, salva partidas. Este pez regordete es más que una cura: es esperanza pura en medio del caos. Un clásico silencioso que todo veterano sabe valorar.",
    price: 8,
    image: model4,
    characteristics: [
      "Material: PLA",
      "Colores: Neranja, Blanco, Negro, Amarillo",
      "Tamaño: 43,09 x 42,21 x 52,31 mm",
    ],
    tags: ["skin", "decorativo"],
  },
  {
    id: 5,
    name: "Bananín Standar",
    description:
      "No es solo una banana disfrazada, es un ícono de la isla con actitud y estilo propio. Con cada paso demuestra que el humor y la habilidad pueden dominar la batalla, convirtiendo lo inesperado en su arma más poderosa.",
    price: 8,
    image: model5,
    characteristics: [
      "Material: PLA",
      "Colores: Amarillo, Café, Negro",
      "Tamaño: 62,05 x 52,09 x 174,03 mm",
    ],
    tags: ["skin", "decorativo"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Fornite: React.FC = () => {
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
      setActiveFilter(null); // Si ya está activo, lo desactiva
    } else {
      setActiveFilter(tag); // Activa el filtro
    }
  };

  // Filtrar productos basado en el filtro activo
  const filteredProducts = activeFilter 
    ? products.filter(product => product.tags?.includes(activeFilter))
    : products;

  // Tema con colores neón y lilas, estilo Fortnite
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#a259ff", // Morado neón
        contrastText: "#fff",
      },
      secondary: {
        main: "#ff5c8d", // Rosa neón
        contrastText: "#fff",
      },
      background: {
        default: mode === "dark" ? "#1a052d" : "#f8f0ff", // Fondo púrpura oscuro / claro liláceo
        paper: mode === "dark" ? "#290b4e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f0e6ff" : "#2a004d",
        secondary: "#d7b8ff",
      },
    },
    typography: {
      fontFamily: "'Rajdhani', 'Orbitron', 'Poppins', sans-serif",
      h3: {
        textShadow: "0 0 10px #a259ff, 0 0 20px #ff5c8d",
      },
      h5: {
        textShadow: "0 0 8px #a259ff",
      },
      button: {
        fontWeight: "bold",
      },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "0 0 8px #a259ff",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 0 20px #ff5c8d",
              backgroundColor: "#ff5c8d",
              color: "#fff",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            borderWidth: 2,
            '&:hover': {
              backgroundColor: "#a259ff",
              color: '#fff',
            },
          },
        },
      },
    },
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
          background: `linear-gradient(90deg, #a259ff 0%, #ff5c8d 100%)`,
          py: 1.5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          fontWeight: "900",
          fontSize: 24,
          letterSpacing: 5,
          userSelect: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          boxShadow: "0 0 20px #a259ff",
          fontFamily: "'Orbitron', sans-serif",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Fornite Studio
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
          maxWidth: 960,
          mx: "auto",
          mt: 6,
          mb: 6,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 0 40px 15px #a259ffaa",
          border: `5px solid ${theme.palette.primary.main}`,
          position: "relative",
          filter: "drop-shadow(0 0 15px #ff5c8daa)",
        }}
      >
        <img
          src={banners[0]}
          alt="Banner Fornite"
          style={{ width: "100%", display: "block", filter: "brightness(0.95)" }}
          loading="lazy"
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 24,
            right: 24,
            fontSize: 40,
            color: theme.palette.primary.main,
            fontWeight: "900",
            letterSpacing: 6,
            textShadow: "0 0 20px #a259ff, 0 0 40px #ff5c8d",
            fontFamily: "'Orbitron', sans-serif",
            userSelect: "none",
          }}
        >
          Fornite 3D Prints
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
          variant="h3"
          sx={{
            fontWeight: "900",
            letterSpacing: 5,
            mb: 2,
            textShadow: `0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.secondary.main}`,
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Catálogo Fornite
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", fontWeight: "600" }}
        >
          Explora los mejores modelos de Fornite, haz click en el producto de tu interés y descubre precios increíbles.
        </Typography>
      </Box>

      {/* Filtros */}
      <Container sx={{ mb: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            textAlign: "center",
            color: theme.palette.primary.main,
            textShadow: "0 0 10px #a259ff",
            fontWeight: "bold"
          }}
        >
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
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${theme.palette.secondary.main}` }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: mode === "dark" ? "#290b4e" : "#fff",
                borderRadius: 20,
                padding: 20,
                cursor: "pointer",
                width: 260,
                boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => setSelectedProduct(product)}
              aria-label={`Ver detalles de ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "contain",
                  marginBottom: 16,
                  borderRadius: 16,
                  filter: "drop-shadow(0 0 10px #ff5c8d)",
                }}
                loading="lazy"
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  textAlign: "center",
                  textShadow: "0 0 8px #a259ff",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, minHeight: 48, textAlign: "center" }}
              >
                {product.description}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: "auto",
                  fontWeight: "900",
                  color: theme.palette.secondary.main,
                  textShadow: "0 0 10px #ff5c8d",
                }}
              >
                ${product.price}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Panel lateral para detalles */}
      {selectedProduct && (
        <Box
          ref={panelRef}
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: { xs: "100%", sm: 360 },
            height: "100vh",
            backgroundColor: mode === "dark" ? "#3c0c75" : "#f7eaff",
            boxShadow: "0 0 30px #a259ffaa",
            zIndex: 1500,
            overflowY: "auto",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            animation: "slideInRight 0.4s ease forwards",
            borderRadius: "0 0 0 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `2px solid ${theme.palette.secondary.main}`,
              pb: 1,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: theme.palette.primary.main,
                textShadow: "0 0 12px #a259ff",
              }}
            >
              {selectedProduct.name}
            </Typography>
          </Box>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              borderRadius: 12,
              maxHeight: 250,
              objectFit: "contain",
              boxShadow: `0 0 20px ${theme.palette.secondary.main}`,
            }}
            loading="lazy"
          />
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.primary, mt: 2 }}
          >
            {selectedProduct.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={1}
              sx={{ color: theme.palette.primary.main }}
            >
              Características:
            </Typography>
            <ul>
              {selectedProduct.characteristics.map((c, i) => (
                <li key={i}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {c}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mt: "auto",
              color: theme.palette.secondary.main,
              textShadow: "0 0 12px #ff5c8d",
            }}
          >
            Precio: ${selectedProduct.price}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3, borderRadius: 6 }}
            onClick={() => alert(`Añadido ${selectedProduct.name} al carrito`)}
          >
            Comprar
          </Button>
        </Box>
      )}

      <Footer />
    </ThemeProvider>
  );
};

export default Fornite;