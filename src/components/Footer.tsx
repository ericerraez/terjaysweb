import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        userSelect: 'none',
      }}
    >
      <Typography variant="body2" mb={1}>
        © {new Date().getFullYear()} Terjays Studio. Todos los derechos reservados, terjaysstudio@gmail.com

      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, fontSize: 24 }}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          style={{ color: 'inherit' }}
        >
          FB
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          style={{ color: 'inherit' }}
        >
          TW
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          style={{ color: 'inherit' }}
        >
          IN
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
