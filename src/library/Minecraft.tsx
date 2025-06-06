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
import bannerMinecraft from "../assets/minecraft.webp";
import mc1 from "../assets/Products/mc1.png";
import mc2 from "../assets/Products/mc2.png";
import mc3 from "../assets/Products/mc3.png";
import mc4 from "../assets/Products/mc4.png";

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
    name: "Dragón Ender (Articulado)",
    description: "Majestuosa y temible, esta criatura es el jefe final del mundo de Minecraft. El Dragón Ender habita en la dimensión del End y representa el mayor desafío para cualquier aventurero. Con su imponente figura negra, ojos púrpura brillantes y habilidades destructivas, es símbolo del poder y el misterio que aguarda al final del juego",
    price: 25,
    image: mc1,
    characteristics: [
      "Material: PLA",
      "Colores: Negro, Blanco, Violeta",
      "Tamaño: 35x35x5 mm",
    ],
    tags: ["articulado", "boss", "decorativo"],
  },
  {
    id: 2,
    name: "Ghast (Tentáculos articulados)",
    description: "Antaño criatura de otro mundo, ahora flota solitaria en las oscuras cavernas del Nether, condenado a un hogar que no eligió. Sus lágrimas caen en forma de fuego, no por odio, sino por miedo y tristeza. Cada rugido es un clamor por libertad, cada explosión una súplica malinterpretada. Dicen que los Ghasts solo quieren regresar… pero el Nether nunca los deja ir.",
    price: 25,
    image: mc2,
    characteristics: [
      "Material: PLA",
      "Colores: Blanco, Negro",
      "Tamaño: 90x25x5 mm",
    ],
    tags: ["articulado", "mob", "nether"],
  },
  {
    id: 3,
    name: "Creeper (Articulado)",
    description: "Siempre ve a los jugadores construir, reír, vivir. Él solo quiere mirar… acompañar.Pero cada vez que se acerca,su cuerpo reacciona.   No lo controla.Boom…Y vuelve la soledad.",
    price: 4,
    image: mc3,
    characteristics: [
      "Material: PLA",
      "Colores: Verde, blanco y negro",
      "Tamaño: 60x30x4 mm",
    ],
    tags: ["articulado", "mob", "iconico"],
  },
  {
    id: 4,
    name: "Esqueleto articulado",
    description: "Una criatura hostil que aparece en las noches y en cuevas oscuras. Armado con su confiable arco, es conocido por su puntería letal y su estilo esquelético inconfundible.",
    price: 8,
    image: mc4,
    characteristics: [
      "Material: PLA",
      "Colores: Blanco, Negro",
      "Tamaño: 88,73 x 103,59 x 29,47 mm",
    ],
    tags: ["articulado", "mob", "nocturno"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Minecraft: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
      primary: { main: "#78C850" }, // Verde Minecraft
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
      fontFamily: "'Press Start 2P', 'Poppins', sans-serif",
    },
    shape: { borderRadius: 10 },
  });

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    const card = e.currentTarget;
    card.style.transform = isHovering ? "scale(1.07)" : "scale(1)";
    card.style.boxShadow = isHovering 
      ? "0 0 30px 5px rgba(120, 200, 80, 0.7)" 
      : mode === "dark" 
        ? "0 0 20px 2px #78C850" 
        : "0 0 20px 2px rgba(120, 200, 80, 0.4)";
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
          background: `linear-gradient(90deg, #78C850 0%, #4CAF50 100%)`,
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
          boxShadow: "0 0 12px #78C850",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Terjays Studio - Minecraft
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

      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          mt: 6,
          mb: 6,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 30px 10px rgba(120, 200, 80, 0.4)",
          border: `4px solid ${theme.palette.primary.main}`,
          position: "relative",
        }}
      >
        <img
          src={bannerMinecraft}
          alt="Banner Minecraft"
          style={{ width: "100%", display: "block" }}
          loading="lazy"
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            right: 24,
            fontSize: 36,
            color: "#78C850",
            fontWeight: "900",
            letterSpacing: 4,
            textShadow: "2px 2px 12px #78C850",
            fontFamily: "'Press Start 2P', cursive",
            userSelect: "none",
          }}
        >
          Minecraft 3D Prints
        </Typography>
      </Box>

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
            fontWeight: "bold",
            letterSpacing: 3,
            mb: 2,
            textShadow: `0 0 15px ${theme.palette.primary.main}`,
          }}
        >
          Catálogo Minecraft
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Descubre el lado cúbico de la impresión 3D con nuestros modelos de Minecraft.
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: product.id * 0.2 }}
              style={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 16,
                boxShadow: mode === "dark" 
                  ? "0 0 20px 2px #78C850" 
                  : "0 0 20px 2px rgba(120, 200, 80, 0.4)",
                padding: 24,
                flex: "1 1 300px",
                maxWidth: 320,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  marginBottom: 20,
                  maxHeight: 200,
                  objectFit: "contain",
                  boxShadow: "0 0 12px rgba(120, 200, 80, 0.5)",
                }}
                loading="lazy"
              />
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
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

      {/* Panel desplegable producto seleccionado */}
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
            display: "flex",
            flexDirection: "column",
          }}
          component={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            {selectedProduct.name}
          </Typography>

          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              width: "100%",
              borderRadius: 10,
              marginBottom: 16,
              objectFit: "contain",
              maxHeight: 300,
            }}
          />

          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedProduct.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Características:
            </Typography>
            {selectedProduct.characteristics.map((char, i) => (
              <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {char}
              </Typography>
            ))}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Etiquetas:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedProduct.tags.map(tag => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <Typography 
            variant="h5" 
            sx={{ 
              mt: "auto", 
              fontWeight: "bold", 
              color: theme.palette.primary.main 
            }}
          >
            ${selectedProduct.price} USD
          </Typography>

          <Box sx={{ mt: 3 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 20px",
                fontSize: 16,
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase",
                width: "100%",
              }}
              onClick={() => alert(`¡Gracias por tu interés en comprar ${selectedProduct.name}!`)}
            >
              Comprar
            </motion.button>
          </Box>
        </Box>
      )}

      <Footer />
    </ThemeProvider>
  );
};

export default Minecraft;