import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import Footer from '../components/Footer';
import imgRender from '../assets/render.jpg';

const Rendering = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

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
      primary: { main: '#00ffff' },
      background: {
        default: mode === 'dark' ? '#0f0f0f' : '#f0f4f8',
        paper: mode === 'dark' ? '#1a1a1a' : '#ffffff',
      },
      text: { primary: mode === 'dark' ? '#fff' : '#000', secondary: 'gray' },
    },
    typography: {
      fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
    },
    shape: { borderRadius: 12 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => scroll.scrollToTop()}>
            Terjays Studio
          </Typography>
          <IconButton onClick={toggleMode} color="inherit" aria-label="toggle dark mode">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          py: { xs: 8, sm: 12 },
          px: 2,
          textAlign: 'center',
          color: theme.palette.text.primary,
          background: mode === 'dark'
            ? 'linear-gradient(to right, #1c1c2d, #2a2a44)'
            : 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Renderizado 3D Profesional
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Da vida a tus ideas con renders hiperrealistas.
        </Typography>
      </Box>

      <Container sx={{ py: 8 }}>
        <motion.img
          src={imgRender}
          alt="Renderizado 3D"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 16,
            marginBottom: 32,
            boxShadow: '0 8px 24px rgba(0, 255, 255, 0.2)',
          }}
        />

        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          ¿Qué ofrecemos?
        </Typography>
        <Typography paragraph color="text.secondary">
          Nuestro servicio de renderizado 3D combina tecnología de vanguardia con creatividad para ofrecer imágenes
          realistas de productos, arquitectura, personajes y más. Perfecto para presentaciones, catálogos y marketing.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mt: 6 }}>
          Beneficios
        </Typography>
        <ul style={{ color: theme.palette.text.secondary, paddingLeft: 20 }}>
          <li>Visualización realista de tus proyectos antes de producirlos.</li>
          <li>Mejor comunicación de ideas con clientes o inversores.</li>
          <li>Alta calidad en detalles, texturas e iluminación.</li>
          <li>Ideal para arquitectos, diseñadores industriales y desarrolladores.</li>
        </ul>

        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mt: 6 }}>
          ¿Necesitas una muestra?
        </Typography>
        <Typography paragraph color="text.secondary">
          Contáctanos para una cotización personalizada y una muestra de render previo al trabajo final.
        </Typography>
      </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default Rendering;
