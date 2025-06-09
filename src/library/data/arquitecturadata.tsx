export interface ArquitecturaItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  characteristics: string[];
  gallery: string[];
  tags: string[];
}

const arquitecturaData: ArquitecturaItem[] = [
  {
    id: 1,
    name: "Edificio de 6 plantas, separado por piezas",
    description: "Maqueta de un edificio de 6 departamentos, separados por bloque",
    characteristics: ["Material: PLA", "Color: Blanco", "Tamaño: 20x20cm"],
    image: "https://cdn.thingiverse.com/renders/ae/fd/04/0e/ba/IMG_6307_display_large.jpg",
    price: 39.99,
    gallery: [
      "https://cdn.thingiverse.com/renders/c3/75/14/da/43/IMG_6323_display_large.jpg",
      "https://cdn.thingiverse.com/renders/b7/85/a5/d3/a8/IMG_6315_display_large.jpg"
    ],
    tags: ["moderno", "interior", "maqueta"],
  },
];

export default arquitecturaData;