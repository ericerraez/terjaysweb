import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';

import Footer from '../components/Footer';
import imgCase from '../assets/case.jpg';

const Cases = () => {
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
        paper: mode === 'dark' ? '#1a1a1a' : '#fff',
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#000',
        secondary: mode === 'dark' ? 'gray' : '#555',
      },
    },
    typography: {
      fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => scroll.scrollToTop()}
          >
            Terjays Studio
          </Typography>
          <IconButton onClick={toggleMode} color="inherit" aria-label="toggle dark mode">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          background: mode === 'dark'
            ? 'linear-gradient(to right, #0f0c29, #302b63, #24243e)'
            : 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
          py: { xs: 8, sm: 12 },
          textAlign: 'center',
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Cases Personalizados
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Diseña tu gabinete ideal: funcionalidad, estética y rendimiento a tu medida.
          </Typography>

          <motion.img
            src={imgCase}
            alt="Case personalizado"
            style={{
              width: '100%',
              maxHeight: isMobile ? 300 : 500,
              objectFit: 'cover',
              borderRadius: 16,
              marginTop: 30,
              boxShadow: '0 0 30px rgba(0,255,255,0.3)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />

          <Box mt={6}>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              En Terjays Studio trabajamos contigo para crear el case de tus sueños. Ofrecemos impresión 3D personalizada, materiales resistentes, diseños únicos y compatibilidad total con tus componentes.
              Ya sea que busques algo elegante, gamer o minimalista, ¡lo hacemos realidad!
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
};

export default Cases;
