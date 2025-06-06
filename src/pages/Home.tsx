// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  createTheme,
  ThemeProvider,
  Container,
  useMediaQuery,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion } from 'framer-motion';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import imgPrinted from '../assets/printed.png';
import imgCase from '../assets/case.jpg';
import imgRender from '../assets/render.jpg';
import imgArtificial from '../assets/Artificial.jpg';
import imgSoftware from '../assets/software.jpg';
import imgEnsamble from '../assets/ensamble.jpg';

import Footer from '../components/Footer';

const services = [
  {
    title: 'Impresiones 3D',
    description: 'Prototipos y piezas personalizadas con la mejor calidad.',
    image: imgPrinted,
    link: '/printing',
  },
  {
    title: 'Cases Personalizados',
    description: 'Diseña el case perfecto para tu PC a tu medida.',
    image: imgCase,
    link: '/cases',
  },
  {
    title: 'Ensamble de PC',
    description: 'Montaje profesional con componentes de última generación.',
    image: imgEnsamble,
    link: '/ensamble',
  },
  {
    title: 'Renderizado 3D',
    description: 'Visualiza tus ideas con renders realistas y detallados.',
    image: imgRender,
    link: '/rendering',
  },
  {
    title: 'Desarrollo de Software',
    description: 'Creación de aplicaciones y sistemas a medida.',
    image: imgSoftware,
    link: '/software',
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Soluciones AI para automatización y optimización.',
    image: imgArtificial,
    link: '/ai',
  },
];

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, link }) => {
  return (
    <Box component={Link} to={link} sx={{ textDecoration: 'none' }}>
      <motion.div
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px #00ffff' }}
        style={{
          padding: 24,
          borderRadius: 16,
          border: '2px solid #00ffff33',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          textAlign: 'center',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        tabIndex={0}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            maxHeight: 160,
            objectFit: 'cover',
            borderRadius: 12,
            marginBottom: 20,
            flexShrink: 0,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00ffff', mb: 1 }}>
          {title}
        </Typography>
        <Typography color="gray" sx={{ flexGrow: 1 }}>
          {description}
        </Typography>
      </motion.div>
    </Box>
  );
};

const Home = () => {
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

  const theme = React.useMemo(
    () =>
      createTheme({
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
      }),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          background: mode === 'dark'
            ? 'linear-gradient(to right, #0f0c29, #302b63, #24243e)'
            : 'linear-gradient(to right, #e0f7fa, #80deea, #4dd0e1)',
          py: { xs: 8, sm: 12 },
          px: 2,
          textAlign: 'center',
          color: theme.palette.text.primary,
          boxShadow: mode === 'dark' ? '0 0 40px rgba(0,255,255,0.3)' : '0 0 40px rgba(0,150,255,0.3)',
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', userSelect: 'none' }}>
          Bienvenido a Terjays Studio
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Soluciones profesionales en impresión 3D, ensamble de PCs, renderizado, tecnología AI y desarrollo de software.
        </Typography>
        <ScrollLink to="servicios" smooth duration={600} offset={-70}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#00ffff',
              color: '#000',
              fontWeight: 'bold',
              px: 5,
              py: 1.5,
              borderRadius: 6,
              boxShadow: '0 4px 15px rgba(0,255,255,0.4)',
              transition: 'all 0.3s ease',
              '&:hover': { backgroundColor: '#00cccc', transform: 'translateY(-3px)' },
            }}
          >
            Nuestros Servicios
          </Button>
        </ScrollLink>
      </Box>

      <Container id="servicios" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 6 }}>
          Servicios
        </Typography>

        {isMobile ? (
          <Swiper spaceBetween={20} slidesPerView={1.2}>
            {services.map(({ title, description, image, link }) => (
              <SwiperSlide key={title}>
                <ServiceCard title={title} description={description} image={image} link={link} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 6 }}>
            {services.map(({ title, description, image, link }) => (
              <ServiceCard key={title} title={title} description={description} image={image} link={link} />
            ))}
          </Box>
        )}
      </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default Home;
