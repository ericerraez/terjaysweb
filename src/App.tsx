import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import logo from './assets/logo1.png';  // Importa tu logo

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Cases from './services/Cases';
import Printing from './services/Printing';
import Rendering from './services/Rendering';
import Software from './services/Software';

import Decorations from './library/decorations';

import Valorant from './library/Valorant';
import Lol from './library/Lol';
import Fortnite from './library/fortnite';
import Minecraft from './library/Minecraft';
import Pokemon from './library/Pokemon';
import Pokedex from './library/pokedex';


import OnePiece from './library/onepiece';
import Dbz from './library/dbz';
import Naruto from './library/naruto';
import Kimetsu from './library/kimetsu';  


const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          {/* Logo en lugar del texto */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, textDecoration: 'none' }}
            aria-label="Terjays Studio home"
          >
            <Box
              component="img"
              src={logo}
              alt="Terjays Studio logo"
              sx={{ height: 80 }}
            />
          </Box>

          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/services">
            Servicios
          </Button>
          <Button color="inherit" component={Link} to="/about">
            Acerca de
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contacto
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/printing" element={<Printing />} />
          <Route path='/rendering' element={<Rendering />} />
          <Route path='/software' element={< Software/>} />
          <Route path='/library/decorations' element={<Decorations />} />

          {/* Rutas de la biblioteca de juegos */}

          <Route path='/library/valorant' element={<Valorant />} />
          <Route path='/library/lol' element={<Lol />} />
          <Route path='/library/fortnite' element={<Fortnite />} />
          <Route path='/library/minecraft' element={<Minecraft />} />
          <Route path='/library/pokemon' element={<Pokemon />} /> 
          <Route path='/library/pokedex' element={<Pokedex />} />

          <Route path='/library/onepiece' element={<OnePiece />} />
          <Route path='/library/dbz' element={<Dbz />} />
          <Route path='/library/naruto' element={<Naruto />} />
          <Route path='/library/kimetsu' element={<Kimetsu />} />

          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Box>
    </div>
  );
};

export default App;
