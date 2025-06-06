import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  CssBaseline,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const services = [
  {
    title: 'Impresiones 3D',
    description: 'Prototipos y piezas personalizadas con la mejor calidad.',
    details:
      'Usamos tecnología avanzada para crear piezas exactas y resistentes. Perfecto para prototipos y producción a pequeña escala.',
  },
  {
    title: 'Cases Personalizados',
    description: 'Diseña el case perfecto para tu PC a tu medida.',
    details:
      'Personalizamos cada case con materiales y diseños únicos, asegurando funcionalidad y estilo para tu computadora.',
  },
  {
    title: 'Ensamble de PC',
    description: 'Montaje profesional con componentes de última generación.',
    details:
      'Nuestros técnicos arman tu PC con precisión, garantizando un rendimiento óptimo y durabilidad.',
  },
  {
    title: 'Renderizado 3D',
    description: 'Visualiza tus ideas con renders realistas y detallados.',
    details: 'Creamos renders de alta calidad para presentaciones, prototipos o marketing.',
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Soluciones AI para automatización y optimización.',
    details:
      'Integramos inteligencia artificial para mejorar procesos y tomar mejores decisiones.',
  },
];

// Tema base que vamos a extender para claro y oscuro
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

const ServicesContent: React.FC = () => {
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
        component="h2"
        textAlign="center"
        mb={6}
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          userSelect: 'none',
          textShadow: 'none', // Quitar neón
        }}
      >
        Nuestros Servicios
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {services.map(({ title, description, details }, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.03,
              boxShadow: `0 0 15px 2px ${theme.palette.primary.main}`,
              transition: { duration: 0.3 },
            }}
            style={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 16,
              padding: 24,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              border: `2px solid ${theme.palette.primary.main}33`,
              userSelect: 'none',
              transition: 'background-color 0.3s ease',
            }}
            tabIndex={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 1,
                textShadow: 'none', // Quitar neón
              }}
            >
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              {description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ flexGrow: 1, mb: 3, color: theme.palette.text.primary }}
            >
              {details}
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 6,
                boxShadow: `0 4px 15px ${theme.palette.primary.main}aa`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.main,
                  boxShadow: `0 6px 20px ${theme.palette.secondary.main}cc`,
                  transform: 'translateY(-3px)',
                },
              }}
            >
              Contactar
            </Button>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

const Services: React.FC = () => {
  // Leer modo guardado o por defecto light
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

      <ServicesContent />
<Footer />

    </ThemeProvider>
  );
};

export default Services;
