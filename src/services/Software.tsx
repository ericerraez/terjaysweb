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
import imgSoftware from '../assets/software.jpg'; // Pon aquí la ruta a tu imagen

const Software = () => {
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => scroll.scrollToTop()}
          >
            Terjays Studio
          </Typography>
          <IconButton
            onClick={toggleMode}
            color="inherit"
            aria-label="toggle dark mode"
          >
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
          background:
            mode === 'dark'
              ? 'linear-gradient(to right, #1c1c2d, #2a2a44)'
              : 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Desarrollo de Software Profesional
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Creamos soluciones digitales a medida para transformar tus ideas.
        </Typography>
      </Box>

      <Container sx={{ py: 8 }}>
        <motion.img
          src={imgSoftware}
          alt="Desarrollo de Software"
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

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
        >
          ¿Qué ofrecemos?
        </Typography>
        <Typography paragraph color="text.secondary">
          Nuestro servicio de desarrollo de software abarca aplicaciones web,
          móviles y sistemas personalizados, utilizando tecnologías modernas para
          entregar productos confiables, escalables y alineados a tus objetivos.
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mt: 6 }}
        >
          Beneficios
        </Typography>
        <ul style={{ color: theme.palette.text.secondary, paddingLeft: 20 }}>
          <li>Soluciones adaptadas a tus necesidades específicas.</li>
          <li>Alta calidad y mantenimiento continuo.</li>
          <li>Innovación con tecnologías punteras.</li>
          <li>Soporte dedicado durante todo el ciclo de vida del software.</li>
        </ul>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mt: 6 }}
        >
          ¿Quieres empezar un proyecto?
        </Typography>
        <Typography paragraph color="text.secondary">
          Contáctanos para una consulta inicial sin compromiso y demos vida a tu
          idea con software a medida.
        </Typography>
      </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default Software;
