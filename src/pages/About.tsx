import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  CssBaseline,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Tema base con turquesa
const baseThemeOptions = {
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    primary: {
      main: '#00ffff',
      contrastText: '#001e1e',
    },
    secondary: {
      main: '#00cccc',
    },
  },
};

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    ...baseThemeOptions,
    palette: {
      ...baseThemeOptions.palette,
      mode,
      background: {
        default: mode === 'dark' ? '#0a1929' : '#e0f7fa',
        paper: mode === 'dark' ? '#112240' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#001e1e',
        secondary: mode === 'dark' ? '#8892b0' : '#444',
      },
    },
  });

const AboutContent: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 10 },
        color: theme.palette.text.primary,
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        mb={6}
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          userSelect: 'none',
          textShadow: 'none', // Quitar neón
        }}
      >
        Acerca de Terjays Studio
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 16,
          padding: 32,
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 8px 24px ${theme.palette.primary.main}44`
              : `0 4px 20px #00000011`,
          userSelect: 'none',
        }}
      >
        <Typography variant="body1" paragraph sx={{ mb: 3, color: theme.palette.text.primary }}>
          En Terjays Studio nos apasiona la innovación y la tecnología. Nos especializamos en ofrecer soluciones
          profesionales en impresión 3D, ensamble de PCs, renderizado 3D y tecnologías de inteligencia artificial.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 3, color: theme.palette.text.primary }}>
          Nuestro equipo está comprometido en brindar servicios personalizados que se ajusten a las necesidades
          específicas de cada cliente, garantizando calidad, eficiencia y resultados excepcionales.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 3, color: theme.palette.text.primary }}>
          Creemos en el poder de la creatividad combinada con la tecnología para transformar ideas en realidades
          tangibles. Estamos aquí para ayudarte a materializar tus proyectos con la mejor tecnología disponible.
        </Typography>

        <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary }}>
          ¡Gracias por confiar en nosotros!
        </Typography>
      </motion.div>
    </Box>
  );
};

const About: React.FC = () => {
  // Estado modo claro/oscuro
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark' || savedMode === 'light') setMode(savedMode);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 90,
          right: 16,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          userSelect: 'none',
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {mode === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
        </Typography>
        <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>

      <AboutContent />
    </ThemeProvider>
  );
};

export default About;
