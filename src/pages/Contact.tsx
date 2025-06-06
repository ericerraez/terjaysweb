import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
  CssBaseline,
  createTheme,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';  

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

const ContactContent: React.FC = () => {
  const theme = useTheme();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Por favor, completa todos los campos.');
      setSubmitted(false);
      return;
    }
    setError('');
    setSubmitted(true);
    console.log('Enviando formulario:', form);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 10 },
        color: theme.palette.text.primary,
        minHeight: '100vh',
        userSelect: 'none',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        mb={4}
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          textShadow: 'none', // quita el neón
        }}
      >
        Contáctanos
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
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Mensaje enviado correctamente!
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark' ? '#15384e' : '#f5faff',
              borderRadius: 1,
            }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
            InputProps={{
              style: { color: theme.palette.text.primary },
            }}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark' ? '#15384e' : '#f5faff',
              borderRadius: 1,
            }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
            InputProps={{
              style: { color: theme.palette.text.primary },
            }}
          />
          <TextField
            label="Mensaje"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark' ? '#15384e' : '#f5faff',
              borderRadius: 1,
            }}
            InputLabelProps={{
              style: { color: theme.palette.text.secondary },
            }}
            InputProps={{
              style: { color: theme.palette.text.primary },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? `0 0 10px ${theme.palette.primary.main}`
                  : 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? `0 0 20px ${theme.palette.primary.main}`
                    : 'none',
              },
            }}
          >
            Enviar
          </Button>
        </form>
      </motion.div>
    </Box>
  );
};

const Contact: React.FC = () => {
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

      <ContactContent />
      <Footer />
    </ThemeProvider>
  );
};

export default Contact;
