import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.png';

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { name: 'Contacto', path: '/contacto' },
];

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#121212',
        boxShadow: '0 2px 10px rgba(0, 255, 255, 0.2)',
        borderBottom: '2px solid #00ffff',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 2, md: 8 },
        }}
      >
        {/* Logo como enlace, sin texto */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          component={Link}
          to="/"
          aria-label="Terjays Studio home"
        >
          <Box
            component="img"
            src={logo}
            alt="Terjays Studio logo"
            sx={{ height: 45, filter: 'drop-shadow(0 0 3px #00ffff)' }}
          />
        </Box>

        {/* Desktop menu */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            {pages.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <Button
                  key={name}
                  component={Link}
                  to={path}
                  sx={{
                    color: isActive ? '#00ffff' : '#aaa',
                    borderBottom: isActive ? '2px solid #00ffff' : 'none',
                    textTransform: 'none',
                    fontWeight: isActive ? 'bold' : 'normal',
                    '&:hover': {
                      color: '#00ffff',
                      borderBottom: '2px solid #00ffff',
                      backgroundColor: 'transparent',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  disableRipple
                >
                  {name}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Mobile menu */}
        {isMobile && (
          <Box>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#00ffff' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                sx: {
                  backgroundColor: '#121212',
                  border: '1px solid #00ffff',
                  color: '#00ffff',
                  mt: 1,
                  minWidth: 150,
                  boxShadow: '0 0 20px #00ffffaa',
                },
              }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem
                  key={name}
                  component={Link}
                  to={path}
                  onClick={handleCloseNavMenu}
                  selected={location.pathname === path}
                  sx={{
                    fontWeight: location.pathname === path ? 'bold' : 'normal',
                    '&.Mui-selected': {
                      backgroundColor: '#00ffff22',
                      '&:hover': {
                        backgroundColor: '#00ffff33',
                      },
                    },
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
