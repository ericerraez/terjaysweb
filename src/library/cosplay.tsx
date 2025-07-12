import { Box, Typography, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Cosplay = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          py: 8,
          px: 2,
          textAlign: 'center',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(120deg, #23233a 0%, #2e2e54 100%)'
            : 'linear-gradient(120deg, #e0f7fa 0%, #b2ebf2 100%)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, color: 'primary.main' }}>
          Accesorios para Cosplay
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Piezas y accesorios personalizados para tus disfraces y personajes favoritos
        </Typography>
      </Box>

      <Container sx={{ py: 6, flex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            ¿Qué ofrecemos?
          </Typography>
          <Typography paragraph>
            Creación de piezas únicas para cosplay, incluyendo:
          </Typography>
          <ul>
            <li><Typography>Armas y accesorios de personajes</Typography></li>
            <li><Typography>Cascos y máscaras</Typography></li>
            <li><Typography>Detalles y complementos</Typography></li>
            <li><Typography>Piezas articuladas</Typography></li>
          </ul>
        </Paper>

        {/* Aquí puedes agregar una galería de ejemplos */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {[1, 2, 3, 4].map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.05 }}>
              <Paper elevation={4} sx={{ width: 250, height: 250, borderRadius: 3 }}>
                {/* Espacio para imágenes de ejemplo */}
                <Box sx={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: theme.palette.mode === 'dark' ? '#2e2e54' : '#e0f7fa'
                }}>
                  <Typography>Imagen de ejemplo {item}</Typography>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Cosplay;