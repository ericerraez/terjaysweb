import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  IconButton,
  createTheme,
  ThemeProvider,
  Chip,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Drawer,
  Button,
  Divider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";

import deco1 from "../assets/Products/Decorative/flor.png";
import deco2 from "../assets/Products/Decorative/escult.png";
import deco3 from "../assets/Products/Decorative/macetaar.png";
import BuyButton from "../components/BuyButton";

const decorations = [
  {
    id: 1,
    name: "Flor Ornamental",
    description: "Flor decorativa impresa en 3D con diseño minimalista, ideal para centros de mesa o repisas modernas.",
    price: 5,
    image: deco1,
    characteristics: ["Material: PLA", "Color: Blanco mate", "Tamaño: 120x120x100 mm"],
    tags: ["floral", "minimalista", "decoración"],
  },
  {
    id: 2,
    name: "Escultura Geométrica",
    description: "Figura geométrica con diseño moderno y elegante, perfecta para ambientes contemporáneos.",
    price: 8,
    image: deco2,
    characteristics: ["Material: PLA", "Color: Negro", "Tamaño: 90x90x150 mm"],
    tags: ["geométrico", "moderno", "arte"],
  },
  {
    id: 3,
    name: "Maceta Espiral",
    description: "Maceta decorativa con diseño en espiral, ideal para suculentas o pequeñas plantas.",
    price: 10,
    image: deco3,
    characteristics: ["Material: PETG", "Color: Verde jade", "Tamaño: 100x100x120 mm"],
    tags: ["plantas", "espiral", "zen"],
  },
   {
    id: 4,
    name: "Modelos de Museo (25 piezas)",
    description: "Colección de figuras históricas y artefactos de museo, ideal para amantes del arte y la historia.",
    price: 10,
    image: "https://media.printables.com/media/prints/d2832cbc-84d4-486f-a7be-3d3a53ece016/images/9720361_71015723-cc53-4a07-92c3-c3cc76eddd80_713ba67d-0578-4f4d-9640-e49d09bc4eef/thumbs/inside/1920x1440/jpg/dm_20250510093350_001.webp",
    characteristics: ["Material: PETG", "Color: Gris, mármol", "Tamaño: 100x100x120 mm"],
    tags: ["historia", "arte", "educativo"],
  },
  {
    id: 5,
    name: "Búho Decorativo",
    description: "Escultura detallada de un búho sobre tronco, ideal para escritorios o estanterías.",
    price: 10,
    image: "https://media.printables.com/media/prints/665bce01-cf4c-44af-9ba3-874bdc55d193/images/9706471_bd125440-50a8-4be0-85a3-499f50f43452_1d9b71cd-931e-4aee-b827-328fd060e7e2/thumbs/inside/1920x1440/png/uil-op-houtstronk.webp",
    characteristics: ["Material: PETG", "Color: Madera, café", "Tamaño: 100x100x120 mm"],
    tags: ["animal", "naturaleza", "decoración"],
  },
  {
    id: 6,
    name: "Busto David Jhones",
    description: "Busto clásico estilo escultórico, inspirado en el arte renacentista.",
    price: 10,
    image: "https://media.printables.com/media/prints/c2f6f084-c5db-4b46-b3ef-c319ec3e9c2f/images/9897728_772bf27e-195f-480a-b037-79d91fda0a29_7e330fa6-3674-4e45-8135-516e7b707cc1/thumbs/inside/1920x1440/png/chatgpt-image-29-mai-2025-16_06_55-1.webp",
    characteristics: ["Material: PETG", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["arte", "clásico", "escultura"],
  },
 {
    id: 7,
    name: "Coliseo Romano",
    description: "Réplica del Coliseo Romano, perfecta para coleccionistas y amantes de la arquitectura antigua.",
    price: 20,
    image: "https://media.printables.com/media/prints/1a2a2177-443e-46a3-a433-c392b6c94353/images/9690544_01b03fba-dcbd-4293-afe7-94b96a377fe6_773eab5b-9433-4431-9841-c756904b286d/thumbs/inside/1920x1440/png/chatgpt-image-may-5-2025-10_23_49-pm.webp",
    characteristics: ["Material: PETG", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["roma", "arquitectura", "historia"],
  },
  {
    id: 8,
    name: "Maceta Elefante",
    description: "Tierna maceta en forma de elefante, perfecta para suculentas o decoración infantil.",
    price: 20,
    image: "https://media.printables.com/media/prints/1204469/images/9047988_b3a5d257-38c3-4c55-947f-d0cb9815f5ef_fb3aa4ab-aef3-4124-af84-6220128ce151/thumbs/inside/1920x1440/jpeg/close-up-view-of-a-matte-white-elephant-shaped-planter-crafted-from-smooth-plastic-a-solitary-subtly-colored-cactus-with-delicate-spi_R2dOWOC.webp",
    characteristics: ["Material: PLA+", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["animales", "plantas", "tierno"],
  },
   {
    id: 9,
    name: "Estatua Caballo",
    description: "Escultura dinámica de caballo en movimiento, ideal para interiores con estilo ecuestre.",
    price: 20,
    image: "https://media.printables.com/media/prints/fc133cdd-34de-4921-9923-6ff9f6dcd370/images/9681654_8cd60430-28bd-4f77-a6ed-61be32261bb6_d552ca72-87b9-48da-a709-7384406c7653/thumbs/inside/1920x1440/png/bronc.webp",
    characteristics: ["Material: PLA+", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["caballo", "animal", "arte"],
  },
 {
    id: 10,
    name: "Maceta Hexagonal",
    description: "Moderna maceta hexagonal, ideal para cactus o decoración minimalista.",
    price: 20,
    image: "https://media.printables.com/media/prints/433478/images/3841162_32bf045d-4114-4ce5-8f55-5c64a18c23b1/thumbs/inside/1920x1440/jpg/thumbnail1.webp",
    characteristics: ["Material: PLA+", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["plantas", "geométrico", "moderno"],
  },
  {
    id: 11,
    name: "Decoración de Pared: Corazón y Rosa",
    description: "Arte mural con diseño de corazón y rosa, un detalle romántico para cualquier habitación.",
    price: 20,
    image: "https://media.printables.com/media/prints/1079399/images/8162451_cc1db202-b623-4f84-ad35-833fefadf59d_ae07dff5-d770-45e7-9174-1f37519147be/thumbs/inside/1920x1440/png/elegant-love-heart-rose-wall-art.webp",
    characteristics: ["Material: PLA+", "Color: Negro", "Tamaño: 100x100x120 mm"],
    tags: ["romántico", "pared", "corazón"],
  },
  {
    id: 12,
    name: "Arte de Pared Safari Hexagonal",
    description: "Panel decorativo con temática safari y forma hexagonal, ideal para estilos exóticos.",
    price: 20,
    image: "https://media.printables.com/media/prints/1025630/images/7787629_23d41259-841a-4531-a5c6-d717d1b33685_b7ac4c24-20e7-460e-810a-16b069ee7053/thumbs/inside/1920x1440/png/hexagon-safari-wall-art.webp",
    characteristics: ["Material: PLA+", "Color: Negro", "Tamaño: 100x100x120 mm"],
    tags: ["safari", "pared", "exótico"],
  },
  {
    id: 13,
    name: "Decoración Super Mario",
    description: "Decoración de pared temática de Super Mario, para fanáticos de los videojuegos retro.",
    price: 20,
    image: "https://media.printables.com/media/prints/919079/images/7015393_8b90552d-9339-4e17-a079-ace0b9eaaefe_47dafabc-deff-4440-a321-e678ddb69368/thumbs/inside/1920x1440/png/super-mario-buller-wall-decor.webp",
    characteristics: ["Material: PLA+", "Color: Negro", "Tamaño: 100x100x120 mm"],
    tags: ["videojuegos", "retro", "mario"],
  },
  {
    id: 14,
    name: "Maceta Fantasía de 3 Torres",
    description: "Maceta de estilo fantástico con diseño de torres, ideal para ambientes creativos.",
    price: 20,
    image: "https://media.printables.com/media/prints/310344/images/2706477_7ccb4708-53d8-427f-a240-2d1e11fb7de9/thumbs/inside/1920x1440/jpg/2022-11-06-080918.webp",
    characteristics: ["Material: PLA+", "Color: Gris o negro", "Tamaño: 100x100x120 mm"],
    tags: ["fantasía", "plantas", "torres"],
  },
  {
    id: 15,
    name: "Estatua Gnomos Maximus",
    description: "Divertida estatua de gnomo romano.",
    price: 20,
    image: "https://media.printables.com/media/prints/9877a219-59f6-4be2-aa09-2ba065c42219/images/9894907_5a0f7ea1-de65-4b71-9547-5b78592c74c4_e7b42a69-2751-46da-9037-976ed75cbc6a/thumbs/inside/1920x1440/jpeg/file_001.webp",
    characteristics: ["Material: PLA+", 
      "Color: Gris o Mármol", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Jardín", "roma", "Gnomo"],
  },
  {
    id: 16,
    name: "Macetas para cactus",
    description: "Macetas decorativas para cactus con diseño elegante.",
    price: 20,
    image: "https://media.printables.com/media/prints/3729e8cb-73c8-48b7-a31e-0d21fd23eeb7/images/9780606_946a415d-76a1-4700-935a-2db82ef4d375_35bed062-388c-41fb-9d54-c4cc08618890/thumbs/inside/1920x1440/jpg/photo_2025-05-16_18-13-31.webp",
    characteristics: ["Material: PLA+", 
      "Color: Gris o Mármol", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Jardín"],
  },
  {
    id: 17,
    name: "Pack de 4 gnomos de jardín",
    description: "Divertida estatua de gnomo romano.",
    price: 35,
    image: "https://media.printables.com/media/prints/d1b7763a-32d1-4e1c-acd2-a4dda2d4fb7e/images/9632311_49caf79a-cdce-488d-a1ce-ed339e7e7a3c_9cbdc7c2-5854-4283-a37d-01ff6e947665/thumbs/inside/1920x1440/jpg/43.webp",
    characteristics: ["Material: PLA+", 
      "Color: Gris o Mármol", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Jardín", "Gnomo"],
  },
  {
    id: 18,
    name: "Maceta Sencilla",
    description: "Maceta sencilla y elegante, ideal para plantas pequeñas.",
    price: 35,
    image: "https://media.printables.com/media/prints/412713/images/3424935_059c8162-314f-4bee-8445-4a3825476e60/thumbs/inside/1920x1440/jpg/pxl_20230301_174624038.webp",
    characteristics: ["Material: PLA+", 
      "Color: Gris o Mármol", 
      "Tamaño: 11 cm"],
    tags: ["Jardín", "Planta"],
  },
  {
    id: 19,
    name: "Planta Ornamental con maceta",
    description: "Planta ornamental impresa en 3D con estilo moderno, ideal para decoración de interiores.",
    price: 35,
    image: "https://media.printables.com/media/prints/656354/images/5173096_13db5b6e-7a7b-4315-8cf7-27101ee0c117_07f8923e-55e8-4832-8e5c-a44269d55ca1/thumbs/inside/1920x1440/jpg/20231119_111024.webp",
    characteristics: ["Material: PLA+", 
      "Color: Verde", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Jardín", "Planta"],
  },
  {
    id: 20,
    name: "Maceta en forma de huevo de dragón",
    description: "Maceta decorativa con forma de huevo de dragón, inspirado en la famosa serie Juego de tronos.",
    price: 35,
    image: "https://media.printables.com/media/prints/440705/images/3642296_a8969269-8178-497a-9d99-3b45791046c8/thumbs/inside/1920x1440/jpg/20230402_085345.webp",
    characteristics: ["Material: PLA+", 
      "Color: A elección", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Dragón", "Planta"],
  },
   {
    id: 21,
    name: "Hermoso Girasol",
    description: "Girasol decorativo impreso en 3D, ideal para dar un toque alegre a cualquier espacio u ocasión.",
    price: 35,
    image: "https://media.printables.com/media/prints/139898/images/1328304_f6f2252e-12b4-43c7-92c6-69d331666e94/thumbs/inside/1920x1440/jpg/small-thumbnail.webp",
    characteristics: ["Material: PLA+", 
      "Color: Amarillo, Café y Verde", 
      "Tamaño: 100x100x120 mm"],
    tags: ["Planta"],
  },
];

const allTags = Array.from(new Set(decorations.flatMap((d) => d.tags)));

const Decorations: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof decorations[0] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("decorationsTheme") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("decorationsTheme", next);
  };

  const handleFilterClick = (tag: string) => {
    setActiveFilter(activeFilter === tag ? null : tag);
  };

  const filteredDecorations = activeFilter
    ? decorations.filter((d) => d.tags.includes(activeFilter))
    : decorations;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: "#5a5a5a" },
      background: {
        default: mode === "dark" ? "#121212" : "#f4f4f4",
        paper: mode === "dark" ? "#1e1e1e" : "#fff",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Typography variant="h6">Tenemos muchos más, pregunta o envíanos tu propuesta y la hacemos realidad!</Typography>
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Filtrar por estilo:
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleFilterClick(tag)}
              color={activeFilter === tag ? "primary" : "default"}
              variant={activeFilter === tag ? "filled" : "outlined"}
            />
          ))}
          {activeFilter && (
            <Chip
              label="Todos"
              onClick={() => setActiveFilter(null)}
              variant="outlined"
              color="secondary"
            />
          )}
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {filteredDecorations.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card sx={{ width: 250, cursor: "pointer" }} onClick={() => setSelectedItem(item)}>
                <CardActionArea>
                  <CardMedia component="img" height="180" image={item.image} alt={item.name} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      {item.characteristics.join(" | ")}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>

      <Drawer
        anchor="right"
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        PaperProps={{ sx: { width: 350, p: 3 } }}
      >
        {selectedItem && (
          <>
            <Typography variant="h5" gutterBottom>
              {selectedItem.name}
            </Typography>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
            <Typography variant="body1" gutterBottom>
              {selectedItem.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedItem.characteristics.join(" | ")}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ my: 2 }}>
              ${selectedItem.price.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <BuyButton 
        productName={selectedItem.name} 
        price={selectedItem.price}
      />
          </>
        )}
      </Drawer>
    </ThemeProvider>
  );
};

export default Decorations;