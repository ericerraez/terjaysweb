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
  Divider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { motion } from "framer-motion";
import BuyButton from "../components/BuyButton";
import gadgetsData from "./data/gadgetsdata";
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';

const allTags = Array.from(new Set(gadgetsData.flatMap((d) => d.tags)));

const Gadgets: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<typeof gadgetsData[0] | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const filteredArquitectura = activeFilter
    ? gadgetsData.filter((d) => d.tags.includes(activeFilter))
    : gadgetsData;

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

  // Cierra el lightbox al cerrar el Drawer
  useEffect(() => {
    if (!selectedItem) {
      setLightboxOpen(false);
      setLightboxIndex(0);
    }
  }, [selectedItem]);

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
        <Typography variant="h6">
          Tenemos muchos más, pregunta o envíanos tu propuesta y la hacemos realidad!
        </Typography>
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
          {filteredArquitectura.map((item) => (
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
              style={{ width: "100%", borderRadius: 8, marginBottom: 16, cursor: "pointer" }}
              onClick={() => {
                setLightboxOpen(true);
                setLightboxIndex(0);
              }}
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
            <BuyButton productName={selectedItem.name} price={selectedItem.price} />
          </>
        )}
      </Drawer>

      {/* Lightbox para galería */}
      {selectedItem && lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={selectedItem.gallery.map((img) => ({
            src: img,
            title: selectedItem.name,
            description: selectedItem.description,
          }))}
          index={lightboxIndex}
          on={{
            view: ({ index }) => setLightboxIndex(index),
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default Gadgets;