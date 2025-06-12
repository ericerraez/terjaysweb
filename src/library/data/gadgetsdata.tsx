export interface GadgetsItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  characteristics: string[];
  gallery: string[];
  tags: string[];
}

const GadgetsData: GadgetsItem[] = [
  {
    id: 1,
    name: "Item",
    description: "Universal Keycap Puller",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/1f9a9d88-2dac-4e47-823a-53d92cf34cbc/images/9808445_750f55ef-e2b5-4fdf-a0f6-3074765a5d06_1e58dbe8-4296-4f9f-9802-0a9876495451/thumbs/inside/1600x1200/webp/1.webp",
    price: 39.99,
    gallery: [
      "https://media.printables.com/media/prints/866d8b49-74c5-4b87-88da-d7c1069f0cd8/images/9808446_834a0573-15e4-43fe-af6a-cebf03bf86b5_06ff57d5-b502-4455-9e58-c8b6cb2aac3c/thumbs/inside/1600x1200/webp/2.webp",
      "https://cdn.thingiverse.com/renders/b7/85/a5/d3/a8/IMG_6315_display_large.jpg",
    ],
    tags: ["moderno", "interior", "maqueta"],
  },
];

export default GadgetsData;