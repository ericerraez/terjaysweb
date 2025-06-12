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
    name: "Keycap Puller",
    description: "Universal Keycap Puller",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://media.printables.com/media/prints/1f9a9d88-2dac-4e47-823a-53d92cf34cbc/images/9808445_750f55ef-e2b5-4fdf-a0f6-3074765a5d06_1e58dbe8-4296-4f9f-9802-0a9876495451/thumbs/inside/1600x1200/webp/1.webp",
    price: 2,
    gallery: [
      "https://media.printables.com/media/prints/866d8b49-74c5-4b87-88da-d7c1069f0cd8/images/9808446_834a0573-15e4-43fe-af6a-cebf03bf86b5_06ff57d5-b502-4455-9e58-c8b6cb2aac3c/thumbs/inside/1600x1200/webp/2.webp",
    ],
    tags: ["Keycap", "PC"],
  },
  {
    id: 2,
    name: "Organizador portable para cables",
    description: "",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749763628/20230826_102119_kbp1iy.webp",
    price: 3.99,
    gallery: [
      "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749763724/20230826_102224_khuuml.webp",
      "https://media.printables.com/media/prints/564262/images/4541799_657df715-4525-4a76-bfa1-eb84fa8d4dc3/thumbs/inside/1920x1440/jpg/20230829_134941.webp",
    ],
    tags: ["Cables", "Organizador", "Portable"],
  },
  {
    id: 3,
    name: "Cable Holder",
    description: "Soporte para cables",
    characteristics: ["Material: PLA", "Color: A elegir"],
    image: "https://res.cloudinary.com/dyqvus6nm/image/upload/v1749764596/24432c02-cd3b-4191-b552-634e954254ac_ih0chd.webp",
    price: 2,
    gallery: [
    ],
    tags: ["Cables", "Organizador"],
  },
];

export default GadgetsData;