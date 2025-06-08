import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Button,
  Divider,
  Badge,
  Card,
  CardContent,
  CardMedia,
  Grow,
  useMediaQuery
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import { animateScroll as scroll } from "react-scroll";
import BuyButton from "../components/BuyButton";
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';

// Datos de productos movidos a un archivo separado (mejor práctica)
import OCCASION_PRODUCTS from "../library/data/occasionProducts";

// Constantes para mejor mantenibilidad
const OCCASIONS = Array.from(new Set(OCCASION_PRODUCTS.map((p) => p.occasion)));
const ALL_TAGS = Array.from(new Set(OCCASION_PRODUCTS.flatMap((p) => p.tags)));

// Tipo para Producto
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  characteristics: string[];
  tags: string[];
  gallery: string[];
  occasion: string;
}

const OcasionesEspeciales: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Memoize filtered products for performance
  const filteredProducts = useMemo(() => {
    return OCCASION_PRODUCTS.filter((product) => {
      const matchesOccasion = !selectedOccasion || product.occasion === selectedOccasion;
      const matchesTag = !activeFilter || product.tags.includes(activeFilter);
      return matchesOccasion && matchesTag;
    });
  }, [selectedOccasion, activeFilter]);

  // Theme configuration
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: "#9C27B0" },
      secondary: { main: "#FF6F00" },
      background: {
        default: mode === "dark" ? "#121212" : "#fafafa",
        paper: mode === "dark" ? "#1a1a1a" : "#fff",
      },
    },
    typography: {
      fontFamily: "'Poppins', 'Nunito', sans-serif",
      h1: {
        fontSize: isMobile ? '2.5rem' : '3.5rem',
        fontWeight: 800,
        letterSpacing: '0.5px'
      },
      h2: {
        fontSize: isMobile ? '2rem' : '2.5rem',
        fontWeight: 700
      },
      h3: {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 600
      },
      body1: {
        lineHeight: 1.7
      }
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }
        }
      }
    }
  }), [mode, isMobile]);

  // Effects
  useEffect(() => {
    const saved = localStorage.getItem("occasionTheme") as "light" | "dark" | null;
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
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [selectedProduct]);

  useEffect(() => {
    // Cuando cambias de producto, cierra el lightbox y resetea el índice
    setLightboxOpen(false);
    setLightboxIndex(0);
    if (selectedProduct) {
      setSelectedImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  // Handlers
  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("occasionTheme", next);
  };

  const handleFilterClick = (tag: string) => {
    setActiveFilter(activeFilter === tag ? null : tag);
  };

  const handleOccasionSelect = (occasion: string) => {
    setSelectedOccasion(selectedOccasion === occasion ? null : occasion);
  };

  const resetFilters = () => {
    setSelectedOccasion(null);
    setActiveFilter(null);
  };

  const handleOpenLightbox = (img: string, index: number) => {
    setSelectedImage(img);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Cuando cierras el panel de detalles, también cierra el lightbox
  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setLightboxOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Floating Particles Background */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: mode === 'dark' 
            ? 'radial-gradient(circle at 20% 30%, rgba(156, 39, 176, 0.15) 0%, transparent 40%)' 
            : 'radial-gradient(circle at 20% 30%, rgba(186, 104, 200, 0.1) 0%, transparent 40%)',
          pointerEvents: 'none'
        }
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: mode === 'dark' ? 'rgba(156, 39, 176, 0.4)' : 'rgba(186, 104, 200, 0.3)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5
            }}
          />
        ))}
      </Box>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: mode === "dark"
            ? "linear-gradient(135deg, rgba(123, 31, 162, 0.9) 0%, rgba(74, 20, 140, 0.9) 100%)"
            : "linear-gradient(135deg, rgba(186, 104, 200, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "clamp(1rem, 4vw, 1.5rem)",
          letterSpacing: "1px",
          textTransform: "uppercase",
          boxShadow: "0 4px 30px rgba(156, 39, 176, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}
        onClick={() => scroll.scrollToTop()}
        title="Ir arriba"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Box component="span" sx={{ 
            width: 10, 
            height: 10, 
            borderRadius: '50%', 
            background: '#FF6F00',
            boxShadow: '0 0 10px #FF6F00'
          }} />
          Regalos Especiales
        </motion.div>
        
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleMode();
          }}
          color="inherit"
          size="large"
          sx={{
            transition: "all 0.3s ease",
            "&:hover": { 
              transform: "rotate(90deg)",
              background: "rgba(255, 255, 255, 0.2)"
            },
          }}
          aria-label="Toggle theme"
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </motion.header>

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "50vh", md: "60vh" },
          backgroundImage: mode === "dark"
            ? "linear-gradient(rgba(0, 0, 0, 0.7), url(https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)"
            : "linear-gradient(rgba(255, 255, 255, 0.7), url(https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: mode === "dark" ? "#fff" : "#4A148C",
          position: "relative",
          overflow: "hidden",
          mb: 6,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100px',
            background: `linear-gradient(to bottom, transparent 0%, ${mode === 'dark' ? '#121212' : '#fafafa'} 100%)`
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ zIndex: 1, padding: '0 1rem' }}
        >
          <Typography variant="h1" component="h1" sx={{ 
            fontWeight: 800,
            mb: 2,
            textShadow: mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 4px rgba(255,255,255,0.5)',
            background: mode === 'dark' 
              ? 'linear-gradient(90deg, #BA68C8, #FF6F00)'
              : 'linear-gradient(90deg, #9C27B0, #FF6F00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Regalos Memorables
          </Typography>
          <Typography variant="h4" component="h2" sx={{ 
            mb: 3,
            fontWeight: 500,
            maxWidth: '800px',
            textShadow: mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : '0 1px 2px rgba(255,255,255,0.5)'
          }}>
            Encuentra el regalo perfecto para cada ocasión especial
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(255, 111, 0, 0.5)',
                '&:hover': {
                  boxShadow: '0 6px 25px rgba(255, 111, 0, 0.7)'
                }
              }}
              onClick={() => {
                const productsSection = document.getElementById('products-section');
                productsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Colección
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(156, 39, 176, 0.2)',
            filter: 'blur(20px)'
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.8, 0.5, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 111, 0, 0.2)',
            filter: 'blur(30px)'
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" id="products-section" sx={{ py: 4, position: 'relative' }}>
        {/* Occasion Filter */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ 
              mb: 4,
              fontWeight: 700,
              background: mode === 'dark' 
                ? 'linear-gradient(90deg, #BA68C8, #FF6F00)'
                : 'linear-gradient(90deg, #9C27B0, #FF6F00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Nuestras Colecciones
            </Typography>
          </motion.div>
          
          <Stack
            direction="row"
            spacing={2}
            sx={{ 
              justifyContent: "center", 
              flexWrap: "wrap", 
              gap: 2,
              mb: 4
            }}
          >
            {OCCASIONS.map((occasion) => (
              <motion.div
                key={occasion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Button
                  variant={selectedOccasion === occasion ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleOccasionSelect(occasion)}
                  sx={{
                    fontWeight: 600,
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    borderWidth: selectedOccasion === occasion ? 0 : 2,
                    boxShadow: selectedOccasion === occasion 
                      ? '0 4px 20px rgba(156, 39, 176, 0.5)'
                      : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 25px rgba(156, 39, 176, 0.7)',
                      borderWidth: 2
                    },
                  }}
                >
                  <Badge
                    badgeContent={OCCASION_PRODUCTS.filter((p) => p.occasion === occasion).length}
                    color="secondary"
                    sx={{ 
                      mr: 2,
                      '& .MuiBadge-badge': {
                        right: -5,
                        top: -5,
                        fontWeight: 'bold'
                      }
                    }}
                  />
                  {occasion}
                </Button>
              </motion.div>
            ))}
          </Stack>

          {selectedOccasion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="text"
                color="secondary"
                onClick={resetFilters}
                sx={{
                  fontWeight: 600,
                  borderRadius: '50px',
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 111, 0, 0.1)'
                  }
                }}
              >
                Mostrar todas las ocasiones
              </Button>
            </motion.div>
          )}
        </Box>

        {/* Tag Filter */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h3" sx={{ 
              mb: 3,
              fontWeight: 600,
              color: mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'
            }}>
              Filtra por características
            </Typography>
          </motion.div>
          
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
              maxWidth: '800px',
              mx: 'auto',
              mb: 4
            }}
          >
            {ALL_TAGS.map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Chip
                  label={tag}
                  color={activeFilter === tag ? "primary" : "default"}
                  onClick={() => handleFilterClick(tag)}
                  variant={activeFilter === tag ? "filled" : "outlined"}
                  sx={{
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    px: 2,
                    py: 1,
                    borderRadius: "20px",
                    boxShadow: activeFilter === tag
                      ? "0 0 15px rgba(156, 39, 176, 0.5)"
                      : "none",
                    fontSize: '0.9rem',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                  deleteIcon={<ClearIcon sx={{ fontSize: '1rem' }} />}
                  onDelete={activeFilter === tag ? () => setActiveFilter(null) : undefined}
                />
              </motion.div>
            ))}
          </Stack>
        </Box>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 10,
            background: mode === 'dark' ? 'rgba(30,30,30,0.5)' : 'rgba(250,250,250,0.5)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
              No encontramos productos con estos filtros
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={resetFilters}
              sx={{ borderRadius: '50px', px: 4 }}
            >
              Reiniciar filtros
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { 
                xs: "1fr", 
                sm: "repeat(2, 1fr)", 
                md: "repeat(3, 1fr)",
                lg: filteredProducts.length >= 4 ? "repeat(4, 1fr)" : "repeat(3, 1fr)"
              },
              gap: 4,
              mb: 8
            }}
          >
            {filteredProducts.map((product, index) => (
              <Grow
                key={product.id}
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                timeout={index * 150}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: "pointer", height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: mode === 'dark' ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(10px)',
                      border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 20px 40px rgba(156, 39, 176, 0.3)',
                        borderColor: mode === 'dark' ? 'rgba(156, 39, 176, 0.5)' : 'rgba(156, 39, 176, 0.3)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                        filter: 'brightness(0.95)'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1.5
                      }}>
                        <Typography variant="h5" fontWeight={700} sx={{ 
                          background: mode === 'dark' 
                            ? 'linear-gradient(90deg, #BA68C8, #FF6F00)'
                            : 'linear-gradient(90deg, #9C27B0, #FF6F00)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {product.name}
                        </Typography>
                        <Chip
                          label={product.occasion}
                          size="small"
                          sx={{ 
                            background: mode === 'dark' 
                              ? 'rgba(156, 39, 176, 0.2)' 
                              : 'rgba(186, 104, 200, 0.2)',
                            color: mode === 'dark' ? '#BA68C8' : '#9C27B0',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: '22px'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                        {product.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ 
                              background: mode === 'dark' 
                                ? 'rgba(255, 111, 0, 0.2)' 
                                : 'rgba(255, 111, 0, 0.1)',
                              color: mode === 'dark' ? '#FFB74D' : '#FF6F00',
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Stack>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto'
                      }}>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small"
                          color="secondary"
                          sx={{ 
                            borderRadius: '50px',
                            px: 2,
                            fontWeight: 600,
                            fontSize: '0.75rem'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                        >
                          Ver detalles
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grow>
            ))}
          </Box>
        )}
      </Container>

      {/* Product Detail Panel */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              maxWidth: isMobile ? "100%" : "500px",
              height: "100vh",
              background: mode === "dark" 
                ? "linear-gradient(135deg, #1a1a1a 0%, #2a1a35 100%)" 
                : "linear-gradient(135deg, #fff 0%, #f5e6ff 100%)",
              boxShadow: "-5px 0 30px rgba(0,0,0,0.3)",
              zIndex: 1500,
              overflowY: "auto",
              padding: "2rem",
              borderLeft: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ 
              position: 'sticky', 
              top: 0, 
              background: mode === 'dark' ? '#2a1a35' : '#f5e6ff',
              pt: 2,
              pb: 3,
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              mb: 3
            }}>
              <Typography variant="h4" fontWeight={700} sx={{
                background: mode === 'dark' 
                  ? 'linear-gradient(90deg, #BA68C8, #FF6F00)'
                  : 'linear-gradient(90deg, #9C27B0, #FF6F00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {selectedProduct.name}
              </Typography>
              <IconButton
                onClick={handleCloseProduct}
                sx={{
                  color: mode === 'dark' ? '#fff' : '#9C27B0',
                  '&:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(156,39,176,0.1)'
                  }
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            {/* Main image and gallery */}
            <Box sx={{ 
              position: 'relative',
              height: '300px',
              mb: 4,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <Box
                component="img"
                src={selectedImage || selectedProduct.image}
                alt={selectedProduct.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => handleOpenLightbox(selectedImage || selectedProduct.image, 0)}
              />
              <Box sx={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                p: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                color: '#fff'
              }}>
                <Typography variant="h5" fontWeight={700}>
                  ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Chip
                  label={selectedProduct.occasion}
                  sx={{ 
                    background: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontWeight: 600,
                    mt: 1
                  }}
                />
              </Box>
            </Box>

            {/* Gallery thumbnails */}
            {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Más imágenes del producto
                </Typography>
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                  {[selectedProduct.image, ...selectedProduct.gallery].map((img, index) => (
                    <Box
                      key={index}
                      onClick={() => handleOpenLightbox(img, index)}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: selectedImage === img ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt={`Vista ${index + 1} de ${selectedProduct.name}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              {selectedProduct.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Características
            </Typography>
            <Stack spacing={1} sx={{ mb: 4 }}>
              {selectedProduct.characteristics.map((char: string, i: number) => (
                <Box key={i} sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: mode === 'dark' ? '#BA68C8' : '#9C27B0',
                    mr: 1.5
                  }
                }}>
                  <Typography variant="body2">{char}</Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              Etiquetas
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {selectedProduct.tags.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Stack>

            <Box sx={{ 
              position: 'sticky',
              bottom: 0,
              background: mode === 'dark' ? '#2a1a35' : '#f5e6ff',
              pt: 2,
              pb: 2,
              borderTop: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h5" fontWeight={700}>
                Total: ${selectedProduct.price.toFixed(2)}
              </Typography>
              <BuyButton 
                productName={selectedProduct.name} 
                price={selectedProduct.price}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox para galería */}
      {lightboxOpen && selectedProduct && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[selectedProduct.image, ...selectedProduct.gallery].map((img) => ({
            src: img,
            title: selectedProduct.name,
            description: selectedProduct.description,
          }))}
          index={lightboxIndex}
          on={{
            view: ({ index }) => setLightboxIndex(index),
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default OcasionesEspeciales;