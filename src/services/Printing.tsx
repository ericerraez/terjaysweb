import { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, CssBaseline, AppBar, Toolbar, IconButton,
  Container, createTheme, ThemeProvider, Button, Paper, Stack, Fade, Divider, useMediaQuery
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

import coleccionesImg from '../assets/colecciones.png';
import valorantImg from '../assets/valorant.webp';
import lolImg from '../assets/lol.webp';
import fortniteImg from '../assets/fortnite.jpg';
import decoracionImg from '../assets/decoracion.webp';
import herramientasImg from '../assets/herramientas.webp';
import gadgetsImg from '../assets/gadgets.png';
import popularImg from '../assets/trending.webp';
import minecraftImg from '../assets/minecraft.webp';
import onepieceImg from '../assets/one-piece.avif';
import dbzImg from '../assets/dbz.jpg';
import narutoImg from '../assets/naruto.webp';
import kimetsuImg from '../assets/kimetsu.webp';
import attackImg from '../assets/attack.jpeg';
import starwarsImg from '../assets/Star_Wars_Logo.svg.png';
import harryImg from '../assets/harry.jpeg';
import marvelImg from '../assets/marvel.jpeg';
import dcImg from '../assets/dc.avif';
import strangerthingsImg from '../assets/Stranger_Things.png';
import pokemonImg from '../assets/pokemon.avif';
import sdImg from '../assets/sd.png';

const Printing = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const coleccionesRef = useRef<HTMLDivElement | null>(null);
  const serviciosRef = useRef<HTMLDivElement | null>(null);

  const isXs = useMediaQuery('(max-width:600px)');
  const isSm = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const saved = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (saved) setMode(saved);
  }, []);

  const toggleMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem('themeMode', next);
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#00bcd4' },
      secondary: { main: '#00bcd4' },
      background: {
        default: mode === 'dark' ? '#181824' : '#f5f7fa',
        paper: mode === 'dark' ? '#23233a' : '#fff',
      },
      text: { primary: mode === 'dark' ? '#fff' : '#222', secondary: '#8e99a3' },
    },
    typography: {
      fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
      h3: { fontWeight: 800, letterSpacing: -1 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
    },
    shape: { borderRadius: 16 },
  });

  const colecciones = [
    { name: 'Videojuegos', sub: ['Valorant', 'League of Legends', 'Fortnite', 'Minecraft', 'Pokemon'] },
    { name: 'Anime', sub: ['One Piece', 'Dragon Ball', 'Naruto', 'Kimetsu no Yaiba', 'Attack on Titan', 'Pokemon'] },
    { name: 'Cultura Pop', sub: ['Star Wars', 'Harry Potter', '', 'Marvel', 'DC', 'Stranger Things'] },
  ];
  const servicios = ['Reparación', 'Personalizado', 'Piezas'];

  const handleMenuOpen = (type: 'colecciones' | 'servicios') => {
    setOpenMenu(openMenu === type ? null : type);
    setOpenSubMenu(null);
  };

  const handleSubMenuOpen = (item: string) => {
    setOpenSubMenu(openSubMenu === item ? null : item);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        openMenu &&
        !coleccionesRef.current?.contains(target) &&
        !serviciosRef.current?.contains(target)
      ) {
        setOpenMenu(null);
        setOpenSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  // Helper to get route for each submenu item
  const getRoute = (label: string) => {
    // Map each submenu label to its corresponding route/component
    const map: Record<string, string> = {
      // Videojuegos
      'Valorant': '/library/valorant',
      'League of Legends': '/library/lol',
      'Fortnite': '/library/fortnite',
      'Minecraft': '/library/minecraft',
      'Pokemon': '/library/pokemon',
      // Anime
      'One Piece': '/library/onepiece',
      'Dragon Ball': '/library/dbz',
      'Naruto': '/library/naruto',
      'Kimetsu no Yaiba': '/library/kimetsu',
      'Attack on Titan': '/library/attack',
      // Cultura Pop
      'Star Wars': '/library/starwars',
      'Harry Potter': '/library/harry',
      'Marvel': '/library/marvel',
      'DC': '/library/dc',
      'Stranger Things': '/library/strangerthings',
    };
    return map[label] || `/coleccion/${encodeURIComponent(label.toLowerCase().replace(/\s+/g, '-'))}`;
  };

  const renderSubMenu = (item: string) => {
    if (item === 'Anime') {
      const subImgs = [
        { img: onepieceImg, label: 'One Piece' },
        { img: dbzImg, label: 'Dragon Ball' },
        { img: narutoImg, label: 'Naruto' },
        { img: kimetsuImg, label: 'Kimetsu no Yaiba' },
        { img: attackImg, label: 'Attack on Titan' },
      ];
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: isXs ? 12 : 24,
              marginTop: 24,
            }}
          >
            {subImgs.map(({ img, label }, idx) => (
              <Box key={idx} sx={{ textAlign: 'center', width: isXs ? 120 : 140 }}>
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Box
                    component={Link}
                    to={getRoute(label)}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
                    <motion.img
                      src={img}
                      alt={label}
                      style={{
                        width: isXs ? 100 : 140,
                        height: isXs ? 65 : 90,
                        borderRadius: 12,
                        objectFit: 'cover',
                        boxShadow: theme.shadows[3],
                        cursor: 'pointer',
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                      {label}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </motion.div>
        </AnimatePresence>
      );
    }
    if (item === 'Videojuegos') {
      const subImgs = [
        { img: valorantImg, label: 'Valorant', route: '/library/valorant' },
        { img: lolImg, label: 'League of Legends' },
        { img: fortniteImg, label: 'Fortnite' },
        { img: minecraftImg, label: 'Minecraft' },
        { img: pokemonImg, label: 'Pokemon' },

      ];
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: isXs ? 12 : 24,
              marginTop: 24,
            }}
          >
            {subImgs.map(({ img, label }, idx) => (
              <Box key={idx} sx={{ textAlign: 'center', width: isXs ? 120 : 140 }}>
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Box
                    component={Link}
                    to={getRoute(label)}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
                    <motion.img
                      src={img}
                      alt={label}
                      style={{
                        width: isXs ? 100 : 140,
                        height: isXs ? 65 : 90,
                        borderRadius: 12,
                        objectFit: 'cover',
                        boxShadow: theme.shadows[3],
                        cursor: 'pointer',
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                      {label}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </motion.div>
        </AnimatePresence>
      );
    }
    if (item === 'Cultura Pop') {
      const subImgs = [
        { img: starwarsImg, label: 'Star Wars' },
        { img: harryImg, label: 'Harry Potter' },
        { img: marvelImg, label: 'Marvel' },
        { img: dcImg, label: 'DC' },
        { img: strangerthingsImg, label: 'Stranger Things' },
      ];
      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: isXs ? 12 : 24,
              marginTop: 24,
            }}
          >
            {subImgs.map(({ img, label }, idx) => (
              <Box key={idx} sx={{ textAlign: 'center', width: isXs ? 120 : 140 }}>
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Box
                    component={Link}
                    to={getRoute(label)}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
                    <motion.img
                      src={img}
                      alt={label}
                      style={{
                        width: isXs ? 100 : 140,
                        height: isXs ? 65 : 90,
                        borderRadius: 12,
                        objectFit: 'cover',
                        boxShadow: theme.shadows[3],
                        cursor: 'pointer',
                      }}
                    />
                    <Typography variant="subtitle2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                      {label}
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            ))}
          </motion.div>
        </AnimatePresence>
      );
    }
    return null;
  };

  const imageButtons = [
    { label: 'Decoración', img: decoracionImg, route: '/library/decorations' },
    { label: 'Herramientas', img: herramientasImg, route: '/tools' },
    { label: 'Gadgets', img: gadgetsImg, route: '/library/gadgets' },
    { label: 'Días Especiales', img: sdImg, route: '/library/OcasionesEspeciales' }, 
    { label: 'Temporada', img: popularImg, route: '/library/season' },
    { label: 'Arquitectura', img: popularImg, route: '/library/arquitectura' },

  ];


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" enableColorOnDark elevation={2}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              cursor: 'pointer',
              fontSize: { xs: 20, sm: 26 },
              color: 'white',
            }}
          >
            Terjays Studio
          </Typography>
          <IconButton onClick={toggleMode} color="inherit" sx={{ ml: 2 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          py: { xs: 5, sm: 8 },
          px: 2,
          textAlign: 'center',
          background: mode === 'dark'
            ? 'linear-gradient(120deg, #23233a 0%, #2e2e54 100%)'
            : 'linear-gradient(120deg, #e0f7fa 0%, #b2ebf2 100%)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, color: 'primary.main', fontSize: { xs: 28, sm: 38 } }}>
          Servicio de Impresiones 3D
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: 16, sm: 20 } }}>
          Creamos prototipos y piezas personalizadas con precisión y calidad profesional.
        </Typography>
      </Box>

      <Container sx={{ py: { xs: 4, sm: 7 }, position: 'relative', minHeight: 300 }}>
        <Paper
          elevation={0}
          sx={{
            mb: { xs: 3, sm: 6 },
            p: { xs: 2, sm: 4 },
            background: mode === 'dark'
              ? 'linear-gradient(90deg, #23233a 60%, #2e2e54 100%)'
              : 'linear-gradient(90deg, #fff 60%, #e0f7fa 100%)',
            borderRadius: 4,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: 15, sm: 19 },
              textAlign: 'center',
              lineHeight: 1.7,
            }}
          >
            Nuestro servicio de impresión 3D permite crear piezas únicas para tus necesidades personales o profesionales.
            Utilizamos materiales de alta calidad y brindamos asesoría durante todo el proceso.
          </Typography>
        </Paper>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 2, sm: 3, md: 5 },
            mb: { xs: 3, sm: 6 },
            position: 'relative',
          }}
        >
          {/* Colecciones (con menú) */}
          <Box sx={{ position: 'relative', display: 'inline-block', width: { xs: 150, sm: 200, md: 260 } }} ref={coleccionesRef}>
            <motion.div whileHover={{ scale: 1.04 }}>
              <motion.img
                src={coleccionesImg}
                alt="Colecciones"
                loading="lazy"
                onClick={() => handleMenuOpen('colecciones')}
                style={{
                  cursor: 'pointer',
                  width: isXs ? 150 : isSm ? 200 : 260,
                  height: isXs ? 180 : isSm ? 240 : 320,
                  borderRadius: 18,
                  boxShadow: theme.shadows[5],
                  objectFit: 'cover',
                  border: `3px solid ${theme.palette.primary.main}`,
                  transition: 'width 0.2s, height 0.2s',
                }}
                whileTap={{ scale: 0.97 }}
              />
            </motion.div>
            <AnimatePresence>
              {openMenu === 'colecciones' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '105%',
                    zIndex: 30,
                    minWidth: isXs ? 180 : 260,
                    width: 'max-content',
                  }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: theme.palette.background.paper,
                      boxShadow: theme.shadows[8],
                      minWidth: isXs ? 180 : 260,
                    }}
                  >
                    <Stack direction={isXs ? 'column' : 'row'} spacing={2} justifyContent="center" alignItems="center">
                      {colecciones.map((item) => (
                        <Button
                          key={item.name}
                          variant={openSubMenu === item.name ? 'contained' : 'outlined'}
                          color="primary"
                          onClick={() => handleSubMenuOpen(item.name)}
                          sx={{
                            borderRadius: 3,
                            fontWeight: 600,
                            textTransform: 'none',
                            px: 2,
                            width: isXs ? '100%' : 'auto',
                          }}
                        >
                          {item.name}
                        </Button>
                      ))}
                    </Stack>
                    <Fade in={!!openSubMenu}>
                      <Box>{openSubMenu && renderSubMenu(openSubMenu)}</Box>
                    </Fade>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: 'center',
                mt: 2,
                fontWeight: 600,
                color: 'primary.main',
                letterSpacing: 1,
                fontSize: { xs: 15, sm: 18 },
              }}
            >
              Colecciones
            </Typography>
          </Box>

          {/* Otros botones con imagen */}
          {imageButtons.map(({ label, img, route }) => (
  <Box 
    key={label} 
    sx={{ 
      position: 'relative', 
      display: 'inline-block', 
      width: { xs: 150, sm: 200, md: 260 } 
    }}
  >
    <motion.div whileHover={{ scale: 1.04 }}>
      <Link to={route} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.img
          src={img}
          alt={label}
          loading="lazy"
          style={{
            cursor: 'pointer',
            width: isXs ? 150 : isSm ? 200 : 260,
            height: isXs ? 180 : isSm ? 240 : 320,
            borderRadius: 18,
            boxShadow: theme.shadows[5],
            objectFit: 'cover',
            border: `3px solid ${theme.palette.secondary.main}`,
            transition: 'width 0.2s, height 0.2s',
          }}
          whileTap={{ scale: 0.97 }}
        />
      </Link>
    </motion.div>
    <Typography
      variant="subtitle1"
      sx={{
        textAlign: 'center',
        mt: 2,
        fontWeight: 600,
        color: 'secondary.main',
        letterSpacing: 1,
        fontSize: { xs: 15, sm: 18 },
      }}
    >
      {label}
    </Typography>
  </Box>
))}

          {/* Servicios */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              minWidth: { xs: 120, sm: 150, md: 180 },
              mt: { xs: 2, md: 0 },
            }}
            ref={serviciosRef}
          >
            <Button
              variant="contained"
              color="secondary"
              size={isXs ? 'medium' : 'large'}
              onClick={() => handleMenuOpen('servicios')}
              sx={{
                borderRadius: 4,
                fontWeight: 700,
                px: 4,
                py: 2,
                boxShadow: theme.shadows[3],
                fontSize: { xs: 15, sm: 18 },
                width: '100%',
              }}
            >
              Servicios
            </Button>
            <AnimatePresence>
              {openMenu === 'servicios' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '110%',
                    zIndex: 30,
                    minWidth: isXs ? 140 : 200,
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      borderRadius: 3,
                      p: 2,
                      bgcolor: theme.palette.background.paper,
                      boxShadow: theme.shadows[8],
                    }}
                  >
                    {servicios.map((item, idx) => (
                      <Box key={item}>
                        <Typography
                          variant="body1"
                          sx={{
                            py: 1,
                            px: 2,
                            cursor: 'pointer',
                            borderRadius: 2,
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            '&:hover': {
                              bgcolor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                            transition: 'all 0.2s',
                          }}
                          onClick={() => setOpenMenu(null)}
                        >
                          {item}
                        </Typography>
                        {idx < servicios.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/contact"
            size={isXs ? 'medium' : 'large'}
            sx={{
              borderRadius: 8,
              fontWeight: 700,
              fontSize: { xs: 16, sm: 20 },
              px: 5,
              py: 2,
              boxShadow: theme.shadows[4],
              textTransform: 'none',
              letterSpacing: 1,
            }}
          >
            Solicitar una Cotización
          </Button>
        </Box>
      </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default Printing;
