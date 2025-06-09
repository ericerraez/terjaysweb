export interface ArquitecturaItem {
  id: number;
  name: string;
  images: string[];
  price: number;
  description: string
  characteristics: string,
  tags: string[];
}
const arquitecturaData: ArquitecturaItem[] = [
  {
    id: 1,
    name: "Producto A",
    description: "Descripción del producto A",
    characteristics:"dd",
    images: [
      "https://cdn.thingiverse.com/renders/ae/fd/04/0e/ba/IMG_6307_display_large.jpg",
      "",
    ],
    price: 99.99,
    tags: ["moderno", "interior"],
  },
];


export default arquitecturaData;
