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
import banner1 from "../assets/Products/banner1.webp";
import banner2 from "../assets/Products/banner2.jpg";
import model1 from "../assets/Products/model1.png";
import model2 from "../assets/Products/model2.png";
import model3 from "../assets/Products/model3.png";
import model5 from "../assets/Products/model5.png";
import model6 from "../assets/Products/model6.png";

// Galerías
import ghost1 from "../assets/Products/ghost1.png";
import BuyButton from "../components/BuyButton";

const banners = [banner1, banner2];

const products = [
  {
    id: 1,
    name: "Llavero Valorant",
    description:
      "El símbolo oficial de Valorant, representando la competitividad y pasión del juego.",
    price: 3,
    image: model1,
    characteristics: [
      "Material: PLA",
      "Colores: Rojo y negro",
      "Tamaño: 34x34x3.5 mm",
    ],
    gallery: [model1],
    tags: ["llavero"],
  },
  {
    id: 2,
    name: "Cuchillo mariposa Valorant",
    description:
      "Forjado para los mejores. Este cuchillo mariposa es un símbolo de victoria, reservado solo para quienes han demostrado habilidad, estrategia y temple en los momentos más intensos",
    price: 10,
    image: model2,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y gris metálico",
      "Tamaño: 120x30x15 mm",
    ],
    tags: ["llavero", "armas"],
    gallery: [model2],
  },
  {
    id: 3,
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
    tags: ["armas"],
    gallery: [model3],
  },
  {
    id: 4,
    name: "Prime Karambit",
    description:
      "Creada por los antiguos Prime, seres de pura energía y diseño divino. El Karambit no es solo un arma: es un símbolo de disciplina y elegancia. Sus movimientos suaves y su resplandor dorado son el legado de un imperio que ya no existe… pero cuya fuerza vive en cada giro letal.",
    price: 8,
    image: model5,
    characteristics: [
      "Material: PLA",
      "Colores: Amarillo, Blanco, Negro ",
      "Tamaño: 443,08 x 142,42 x 11,52 mm",
    ],
    tags: ["armas"],
    gallery: [model5],
  },
  {
    id: 5,
    name: "Ghost Sistema de entretenimiento radiante (con gatillo móvil)",
    description:
      "Una pistola silenciosa diseñada para los Radiantes que prefieren precisión y discreción. Gracias a su tecnología avanzada, permite eliminar objetivos sin hacer ruido, manteniendo el control en combates sigilosos.",
    price: 23,
    image: model6,
    characteristics: [
      "Material: PLA",
      "Colores: Negro y rojo oscuro",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["armas"],
    gallery: [model6, ghost1],
  },
  {
    id: 6,
    name: "Decoración de pared Valorant",
    description: "Logo Valorant",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/fl_preserve_transparency/v1748905029/valorantwall_z4xjb8.jpg?_s=public-apps",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y rojo oscuro",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["decorativo"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/fl_preserve_transparency/v1748905029/valorantwall_z4xjb8.jpg?_s=public-apps","https://res.cloudinary.com/dyqvus6nm/image/upload/fl_preserve_transparency/v1748905219/Screenshot_2025-06-02_175916_xb1ek5.jpg?_s=public-apps"],
  },
  {
    id: 7,
    name: "Key Caps Sage",
    description: "Key caps inspirados en la agente Sage",
    price: 25,
    image: "https://media.printables.com/media/prints/920083/images/7022457_bf436cc6-1d5d-4a4b-9861-f7d2bc65fa4d_44f87ba4-d547-4b00-b571-d18ac12ebb4e/thumbs/inside/1920x1440/png/sage-keycaps.webp",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://media.printables.com/media/prints/920083/images/7022457_bf436cc6-1d5d-4a4b-9861-f7d2bc65fa4d_44f87ba4-d547-4b00-b571-d18ac12ebb4e/thumbs/inside/1920x1440/png/sage-keycaps.webp", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749191217/Screenshot_2025-06-06_012637_iv2hld.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749191300/Screenshot_2025-06-06_012759_t5fhpk.png"],
  },
  {
    id: 8,
    name: "Key Caps KAY0",
    description: "Key caps inspirados en el agente Kay0",
    price: 25,
    image: "https://media.printables.com/media/prints/272274/images/2422580_9427f0fa-ee4a-48ae-97f8-d5d68db0a795/thumbs/inside/1920x1440/png/untitled-design.webp",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://media.printables.com/media/prints/272274/images/2422580_9427f0fa-ee4a-48ae-97f8-d5d68db0a795/thumbs/inside/1920x1440/png/untitled-design.webp", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749189787/Screenshot_2025-06-06_010251_ugikob.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749189933/Screenshot_2025-06-06_010523_nxjlm1.png"],
  },
  {
    id: 9,
    name: "Key Caps Killjoy",
    description: "Key caps inspirados en la agente Killjoy",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749163068/Screenshot_2025-06-05_173650_f0asgm.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749163068/Screenshot_2025-06-05_173650_f0asgm.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749190789/Screenshot_2025-06-06_011937_gpfsbo.png"],
  },
  {
    id: 10,
    name: "Key Caps Chamber",
    description: "Key caps inspirados en el agente Chamber",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749189382/Screenshot_2025-06-06_005606_ppkjgr.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749189382/Screenshot_2025-06-06_005606_ppkjgr.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749192102/Screenshot_2025-06-06_014123_hwhpuz.png"],
  },
  {
    id: 11,
    name: "Key Caps Cypher",
    description: "Key caps inspirados en el agente Cypher",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749192995/Screenshot_2025-06-06_015622_x5eo1p.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749192995/Screenshot_2025-06-06_015622_x5eo1p.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749193128/Screenshot_2025-06-06_015836_omnnsh.png"],
  },
  {
    id: 12,
    name: "Key Caps Deadlock",
    description: "Key caps inspirados en deadlock",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749194464/Screenshot_2025-06-06_022053_f16ozz.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749194464/Screenshot_2025-06-06_022053_f16ozz.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749194576/Screenshot_2025-06-06_022227_kyj1dq.png"],
  },
   {
    id: 13,
    name: "Key Caps Raze",
    description: "Key caps inspirados en deadlock",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196499/Screenshot_2025-06-06_025442_wqdpnv.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196499/Screenshot_2025-06-06_025442_wqdpnv.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196552/Screenshot_2025-06-06_025543_qmphpe.png"],
  },
  {
    id: 14,
    name: "Key Caps Jett",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195061/Screenshot_2025-06-06_023051_cndnpy.png"],
  },
  {
    id: 15,
    name: "Key Caps Neon",
    description: "Key caps inspirados en Neon",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196775/Screenshot_2025-06-06_025921_q3g3eo.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196775/Screenshot_2025-06-06_025921_q3g3eo.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749196883/Screenshot_2025-06-06_030111_eg9hru.png"],
  },
  {
    id: 16,
    name: "Key Caps Reina",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749197320/Screenshot_2025-06-06_030830_na8r3a.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749197320/Screenshot_2025-06-06_030830_na8r3a.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749197415/Screenshot_2025-06-06_031004_izftzr.png"],
  },
  {
    id: 17,
    name: "Key Caps Jett",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195061/Screenshot_2025-06-06_023051_cndnpy.png"],
  },
  {
    id: 18,
    name: "Key Caps Jett",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195061/Screenshot_2025-06-06_023051_cndnpy.png"],
  },
  {
    id: 19,
    name: "Key Caps Jett",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195061/Screenshot_2025-06-06_023051_cndnpy.png"],
  },
  {
    id: 20,
    name: "Key Caps Jett",
    description: "Key caps inspirados en Jett",
    price: 25,
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png",
    characteristics: [
      "Material: PLA",
      "Colores: Negro y Dorado, o Negro y Verde Esmeralda",
      "Tamaño: 110x40x15 mm",
    ],
    tags: ["KeyCaps"],
    gallery: ["https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195142/Screenshot_2025-06-06_023213_euvlav.png", "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749195061/Screenshot_2025-06-06_023051_cndnpy.png"],
  },
];

// Extraer todos los tags únicos de los productos
const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

const Valorant: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      // Resetear índice de imagen cuando se abre un nuevo producto
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
      setActiveFilter(null); // Si ya está activo, lo desactiva
    } else {
      setActiveFilter(tag); // Activa el filtro
    }
  };

  // Filtrar productos basado en el filtro activo
  const filteredProducts = activeFilter 
    ? products.filter(product => product.tags?.includes(activeFilter))
    : products;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#ff4655" },
      background: {
        default: mode === "dark" ? "#0e0e0e" : "#f5f5f5",
        paper: mode === "dark" ? "#1a1a1a" : "#ffffff",
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
          background: `linear-gradient(90deg, #ff4655 0%, #ff006e 100%)`,
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
          boxShadow: "0 0 12px #ff4655",
        }}
        onClick={() => scroll.scrollToTop()}
      >
        Terjays Studio
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
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 30px 10px rgba(255, 70, 85, 0.4)",
          border: `4px solid ${theme.palette.primary.main}`,
          position: "relative",
        }}
      >
        <img
          src={banners[0]}
          alt="Banner Valorant"
          style={{ width: "100%", display: "block" }}
          loading="lazy"
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            right: 24,
            fontSize: 36,
            color: "#ff4655",
            fontWeight: "900",
            letterSpacing: 4,
            textShadow: "2px 2px 12px #ff4655",
            fontFamily: "'Orbitron', sans-serif",
            userSelect: "none",
          }}
        >
          Valorant 3D Prints
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
            fontWeight: "bold",
            letterSpacing: 3,
            mb: 2,
            textShadow: `0 0 15px ${theme.palette.primary.main}`,
          }}
        >
          Catálogo Valorant
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Fantásticos modelos inspirados en Valorant, haz click en el producto de tu interés y descubre precios increíbles. 
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
                    ? "0 0 20px 2px #ff4655"
                    : "0 0 20px 2px rgba(255, 70, 85, 0.4)",
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
                card.style.boxShadow = "0 0 30px 5px rgba(255, 70, 85, 0.7)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "scale(1)";
                card.style.boxShadow = "0 0 20px 2px rgba(255, 70, 85, 0.4)";
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
                  boxShadow: "0 0 12px rgba(255, 70, 85, 0.5)",
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
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
          >
            {selectedProduct.name}
          </Typography>
          
          {/* Carrusel de imágenes */}
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
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
              }}
            />
            
            {/* Flechas de navegación (solo si hay más de una imagen) */}
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
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
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
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.7)",
                    },
                  }}
                >
                  &gt;
                </IconButton>
              </>
            )}
            
            {/* Indicadores de posición (puntos) */}
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

          <Typography variant="body1" sx={{ mb: 3 }}>
            {selectedProduct.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              mb: 1, 
              borderBottom: `2px solid ${theme.palette.primary.main}`, 
              pb: 1 
            }}
          >
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

export default Valorant;