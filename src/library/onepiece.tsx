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
import banner1 from "../assets/one-piece.avif";
import one1 from "../assets/Products/anime/one1.png";
import one1b from "../assets/Products/anime/one1b.png";
import one2 from "../assets/Products/anime/one2.png";
import one2a from "../assets/Products/anime/one2a.png";
import one2b from "../assets/Products/anime/one2b.png";
import one2c from "../assets/Products/anime/one2c.png";
import model3 from "../assets/Products/model3.png";
import model5 from "../assets/Products/model5.png";
import model6 from "../assets/Products/model6.png";
import ghost1 from "../assets/Products/ghost1.png";
import BuyButton from "../components/BuyButton";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  characteristics: string[];
  gallery: string[];
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Llavero del Sombrero de Paja",
    description:
      "El símbolo de la tripulación que desafía al mundo. Representa la libertad y los sueños que nunca mueren.",
    price: 3,
    image: one1,
    characteristics: [
      "Material: PLA",
      "Colores: Rojo y negro",
      "Tamaño: 34x34x3.5 mm",
    ],
    gallery: [one1, one1b],
    tags: ["llavero", "sombrero-de-paja", "accesorio"],
  },
  {
    id: 2,
    name: "Espada de Zoro",
    description:
      "Forjado en Wano Country, este cuchillo es parte del estilo de pelea de tres espadas del espadachín más fuerte de la tripulación.",
    price: 10,
    image: one2,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y gris metálico",
      "Tamaño: 120x30x15 mm",
    ],
    gallery: [one2, one2a, one2b, one2c],
    tags: ["espada", "zoro", "arma"],
  },
  {
    id: 3,
    name: "Karambit de Law",
    description:
      "Inspirado en el arma del capitán de los Heart Pirates, Trafalgar Law. Cada movimiento refleja la precisión del usuario de la Ope Ope no Mi.",
    price: 10,
    image: model3,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y amarillo oscuro",
      "Tamaño: 110x40x15 mm",
    ],
    gallery: [model3],
    tags: ["karambit", "law", "arma"],
  },
  {
    id: 4,
    name: "Karambit de Shanks",
    description:
      "Creado para los verdaderos emperadores de los mares. Su diseño refleja el poder y la elegancia del pelirrojo que domina el Nuevo Mundo.",
    price: 8,
    image: model5,
    characteristics: [
      "Material: PLA",
      "Colores: Rojo, Negro y Oro",
      "Tamaño: 443,08 x 142,42 x 11,52 mm",
    ],
    gallery: [model5],
    tags: ["karambit", "shanks", "emperador"],
  },
  {
    id: 5,
    name: "Pistola de Usopp (con gatillo móvil)",
    description:
      "El arma preferida del francotirador de los Sombrero de Paja. Perfecta para disparar semillas pop green con precisión milimétrica.",
    price: 23,
    image: model6,
    characteristics: [
      "Material: PLA",
      "Colores: Marrón y negro",
      "Tamaño: 135x35x20 mm",
    ],
    gallery: [model6, ghost1],
    tags: ["pistola", "usopp", "arma"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Onepiece: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      setCurrentImageIndex(0);
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

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProduct.gallery.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedProduct.gallery.length) % selectedProduct.gallery.length
      );
    }
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
      primary: { main: "#d42300" }, // Rojo One Piece
      secondary: { main: "#ffcc00" }, // Amarillo del Jolly Roger
      background: {
        default: mode === "dark" ? "#0a0a2a" : "#e6f7ff", // Azul marino/cielo
        paper: mode === "dark" ? "#1a1a3a" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#000",
        secondary: mode === "dark" ? "#ffcc00" : "#d42300",
      },
    },
    typography: {
      fontFamily: "'Pirata One', 'Rajdhani', sans-serif",
    },
    shape: { borderRadius: 10 },
  });

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    const card = e.currentTarget;
    card.style.transform = isHovering ? "scale(1.07)" : "scale(1)";
    card.style.boxShadow = isHovering 
      ? "0 0 30px 5px rgba(212, 35, 0, 0.7)" 
      : mode === "dark" 
        ? "0 0 20px 2px #ffcc00" 
        : "0 0 20px 2px rgba(212, 35, 0, 0.4)";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Header - Barco pirata */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: `linear-gradient(90deg, #d42300 0%, #8b0000 100%)`,
          py: 1.5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#ffcc00",
          fontWeight: "bold",
          fontSize: 28,
          letterSpacing: 3,
          userSelect: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          boxShadow: "0 0 12px #d42300",
          fontFamily: "'Pirata One', cursive",
          borderBottom: "3px solid #ffcc00"
        }}
        onClick={() => scroll.scrollToTop()}
      >
        El Tesoro del Rey Pirata
        <IconButton
          onClick={toggleMode}
          color="inherit"
          aria-label="toggle dark mode"
          size="large"
          sx={{ color: "#ffcc00" }}
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Banner - Mapa del tesoro */}
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          mt: 6,
          mb: 6,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 30px 10px rgba(212, 35, 0, 0.4)",
          border: `4px solid ${theme.palette.primary.main}`,
          position: "relative",
        }}
      >
        <img
          src={banner1}
          alt="Mapa del tesoro"
          style={{ width: "100%", display: "block", filter: "sepia(70%)" }}
          loading="lazy"
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            right: 24,
            fontSize: 42,
            color: "#ffcc00",
            fontWeight: "900",
            letterSpacing: 4,
            textShadow: "3px 3px 5px #000",
            fontFamily: "'Pirata One', cursive",
            userSelect: "none",
          }}
        >
          Reliquias del Grand Line
        </Typography>
      </Box>

      {/* Título principal - Isla del tesoro */}
      <Box
        sx={{
          py: { xs: 4, sm: 6 },
          px: 2,
          textAlign: "center",
          color: theme.palette.text.primary,
          backgroundImage: mode === "dark" 
            ? "linear-gradient(rgba(10, 10, 42, 0.8), rgba(26, 26, 58, 0.8))" 
            : "linear-gradient(rgba(230, 247, 255, 0.8), rgba(255, 255, 255, 0.8))",
          position: "relative",
          overflow: "hidden",
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('https://i.imgur.com/TEJtdsW.jpeg')",
            backgroundSize: "cover",
            opacity: 0.1,
            zIndex: -1,
          }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: 3,
            mb: 2,
            textShadow: `0 0 15px ${theme.palette.secondary.main}`,
            fontFamily: "'Pirata One', cursive",
            color: theme.palette.secondary.main
          }}
        >
          Catálogo del Tesoro Pirata
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            maxWidth: 600, 
            mx: "auto",
            fontFamily: "'Rajdhani', sans-serif"
          }}
        >
          Descubre las reliquias perdidas en los mares de Grand Line. 
          ¡Haz click en el tesoro que deseas encontrar!
        </Typography>
      </Box>

      {/* Filtros - Mapa de navegación */}
      <Container sx={{ mt: 4, mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            textAlign: "center",
            fontFamily: "'Pirata One', cursive",
            color: theme.palette.primary.main
          }}
        >
          Ruta de Navegación:
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
              label={tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              onClick={() => handleFilterClick(tag)}
              variant={activeFilter === tag ? "filled" : "outlined"}
              color="primary"
              sx={{
                fontWeight: "bold",
                textTransform: "capitalize",
                borderWidth: 2,
                fontFamily: "'Rajdhani', sans-serif",
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                },
              }}
            />
          ))}
          {activeFilter && (
            <Chip
              label="Todas las Rutas"
              onClick={() => setActiveFilter(null)}
              variant="outlined"
              color="secondary"
              sx={{
                fontWeight: "bold",
                borderWidth: 2,
                fontFamily: "'Rajdhani', sans-serif",
              }}
            />
          )}
        </Stack>
      </Container>

      {/* Productos - Coffres del tesoro */}
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
                  ? "0 0 20px 2px #ffcc00"
                  : "0 0 20px 2px rgba(212, 35, 0, 0.4)",
                padding: 24,
                flex: "1 1 300px",
                maxWidth: 320,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                userSelect: "none",
                border: "2px solid",
                borderColor: theme.palette.secondary.main,
                position: "relative",
                overflow: "hidden",
              }}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }} />
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  marginBottom: 20,
                  maxHeight: 200,
                  objectFit: "contain",
                  boxShadow: `0 0 12px ${theme.palette.secondary.main}`,
                  border: "1px solid",
                  borderColor: theme.palette.primary.main
                }}
                loading="lazy"
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "bold", 
                  mb: 1,
                  fontFamily: "'Pirata One', cursive",
                  color: theme.palette.primary.main
                }}
              >
                {product.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 1.5,
                  fontFamily: "'Rajdhani', sans-serif"
                }}
              >
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {product.tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag.replace(/-/g, ' ')} 
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      textTransform: 'capitalize'
                    }}
                  />
                ))}
              </Box>
              <Box sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              }} />
            </motion.div>
          ))}
        </Box>
      </Container>

      {/* Panel desplegable - Isla flotante */}
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
            borderLeft: `4px solid ${theme.palette.secondary.main}`,
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 10,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }
          }}
          component={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ 
              mb: 2, 
              fontWeight: "bold", 
              textAlign: "center",
              fontFamily: "'Pirata One', cursive",
              color: theme.palette.primary.main,
              borderBottom: `2px solid ${theme.palette.secondary.main}`,
              pb: 1
            }}
          >
            {selectedProduct.name}
          </Typography>
          
          {/* Carrusel de imágenes - Mapa del tesoro */}
          <Box sx={{ position: "relative", mb: 3 }}>
            <Box
              component="img"
              src={selectedProduct.gallery[currentImageIndex]}
              alt={selectedProduct.name}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                borderRadius: 2,
                boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
            
            {selectedProduct.gallery.length > 1 && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  &lt;
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  &gt;
                </IconButton>
              </>
            )}
            
            {selectedProduct.gallery.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  gap: 1,
                }}
              >
                {selectedProduct.gallery.map((_, index) => (
                  <Box
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentImageIndex
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontFamily: "'Rajdhani', sans-serif",
              fontStyle: "italic"
            }}
          >
            {selectedProduct.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              mb: 1, 
              borderBottom: `2px solid ${theme.palette.secondary.main}`, 
              pb: 1,
              fontFamily: "'Pirata One', cursive",
              color: theme.palette.primary.main
            }}
          >
            Características del Tesoro:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            {selectedProduct.characteristics.map((charac, idx) => (
              <Box 
                component="li" 
                key={idx}
                sx={{
                  '&::marker': {
                    color: theme.palette.secondary.main,
                    content: '"⚓ "'
                  }
                }}
              >
                <Typography 
                  variant="body2"
                  sx={{
                    fontFamily: "'Rajdhani', sans-serif"
                  }}
                >
                  {charac}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              mb: 1, 
              borderBottom: `2px solid ${theme.palette.secondary.main}`, 
              pb: 1,
              fontFamily: "'Pirata One', cursive",
              color: theme.palette.primary.main
            }}
          >
            Etiquetas del Tesoro:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {selectedProduct.tags.map(tag => (
              <Chip 
                key={tag} 
                label={tag.replace(/-/g, ' ')}
                color="primary"
                variant="outlined"
                sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  textTransform: 'capitalize'
                }}
              />
            ))}
          </Box>

          {/* Botón Comprar - Reclamar tesoro */}
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

export default Onepiece;